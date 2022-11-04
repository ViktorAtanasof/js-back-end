const { hasUser } = require('../middlewares/guards');
const { getAll, createAd, getById, editAd, deleteAd, apply, getUsersApplied, getAdsByEmail } = require('../services/adService');
const { getUser } = require('../services/userService');
const { parseError } = require('../util/parser');

const adController = require('express').Router();

adController.get('/catalog', async (req,res) => {
    const ads = await getAll();
    res.render('all-ads', {
        ads
    })
});

adController.get('/create', hasUser(), (req, res) => {
    res.render('create');
});

adController.post('/create', hasUser(), async(req, res) => {
    const ad = {...req.body, author: req.user._id};

    try {
        await createAd(ad);
        res.redirect('catalog');
    } catch(err) {
        res.render('create', {
            body: ad,
            errors: parseError(err)
        })
    }
});

adController.get('/details/:id', async(req, res) => {
    const ad = await getById(req.params.id);
    const user = await getUser(ad.author);
    ad.authorEmail = user.email;

    if(req.user != undefined) {
        ad.userExists = res.locals.email;
        ad.isAuthor = ad.author.toString() == req.user._id.toString();  
        ad.usersApplied = ad.users.map(v => v.toString().includes(req.user._id.toString())).includes(true);
        ad.jobApplicants = await getUsersApplied(ad._id);
    }
    res.render('details', {
        ad
    })
});

adController.get('/edit/:id', hasUser(), async(req, res) => {
    const ad = await getById(req.params.id);

    if(ad.author.toString() != req.user._id.toString()) {
        return res.redirect('/');
    };

    res.render('edit', {
        ad
    })
});

adController.post('/edit/:id', hasUser(), async(req, res) => {
    const ad = await getById(req.params.id);

    if(ad.author.toString() != req.user._id.toString()) {
        return res.redirect('/');
    };

    try {
        /* if(Object.values(req.body).some(v => !v)) {
            throw new Error('All fields are required');
        }; */

        await editAd(req.params.id, req.body);
        res.redirect(`/details/${req.params.id}`);
    } catch (err) {
        res.render('edit', {
            ad: req.body,
            errors: parseError(err)
        })
    }
});

adController.get('/delete/:id', hasUser(), async(req, res) => {
    const ad = await getById(req.params.id);

    if(ad.author.toString() != req.user._id.toString()) {
        return res.redirect('/');
    };

    await deleteAd(req.params.id);
    res.redirect('/catalog');
});

adController.get('/apply/:id', hasUser(), async (req, res) => {
    const ad = await getById(req.params.id);

    if(ad.author.toString() != req.user._id.toString()
    && ad.users.map(v => v.toString()).includes(req.user._id.toString()) == false) {
        await apply(req.params.id, req.user._id);
    };

    return res.redirect(`/details/${req.params.id}`);
});

adController.get('/search', hasUser(), async (req, res) => {
    const userId = req.user._id
    const email = req.user.email;

    const ads = await getAdsByEmail(userId);
    res.render('search', {ads, email});
});


module.exports = adController;