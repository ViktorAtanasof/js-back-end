const { hasUser } = require('../middlewares/guards');
const { createArt, getAll, getById, share, editArt, deleteArtById } = require('../services/artService');
const { getUser } = require('../services/userService');
const { parseError } = require('../util/parser');
const artController = require('express').Router();

artController.get('/gallery', async (req, res) => {
    const arts = await getAll();
    res.render('gallery', {
        arts
    })
});

artController.get('/create', hasUser(), (req, res) => {
    res.render('create')
});

artController.post('/create', hasUser(), async (req, res) => {
    const art = {
        title: req.body.title,
        tech: req.body.tech,
        picture: req.body.picture,
        certificate: req.body.certificate,
        author: req.user._id
    };


    try {
        if(Object.values(art).some(v => !v)) {
            throw new Error('All fields are required');
        };
        await createArt(art); //Alternative variant - await createArt(...req.body, owner: res.user._id);
        res.redirect('/gallery');
    } catch(err) {
        res.render('create', {
            body: art,
            errors: parseError(err)
        });
    }

    res.render('create');
});

artController.get('/details/:id', async (req, res) => {
    const art = await getById(req.params.id);
    const user = await getUser(art.author);
    art.authorName = user.username;

    if(req.user != undefined) {
        art.usernameExists = res.locals.username;
        art.isOwner = art.author.toString() == req.user._id.toString();  
        art.usersShared = art.shares.map(v => v.toString().includes(req.user._id.toString())).includes(true);

    };

    res.render('details', {
        art
    });
});

artController.get('/edit/:id', hasUser(), async (req, res) => {
    const art = await getById(req.params.id);

    if(art.author.toString() != req.user._id.toString()) {
        return res.redirect('/');
    };

    res.render('edit', {
        art
    })
});

artController.post('/edit/:id', hasUser(), async (req, res) => {
    const art = await getById(req.params.id);

    if(art.author.toString() != req.user._id.toString()) {
        return res.redirect('/');
    };

    try {
        await editArt(req.params.id, req.body);
        res.redirect(`/details/${req.params.id}`);
    } catch(err) {
        res.render('edit', {
            art: req.body,
            errors: parseError(err)
        })
    }
});

artController.get('/delete/:id', hasUser(), async (req, res) => {
    const art = await getById(req.params.id);

    if(art.author.toString() != req.user._id.toString()) {
        return res.redirect('/');
    };

    await deleteArtById(req.params.id);
    res.redirect('/gallery');
});

artController.get('/share/:id', hasUser(), async (req, res) => {
    const art = await getById(req.params.id);
    
    if(art.author.toString() != req.user._id.toString() 
    && art.shares.map(x => x.toString()).includes(req.user._id.toString()) == false) {
        await share(req.params.id, req.user._id);
    }
    
    res.redirect(`/`);
});

module.exports = artController;