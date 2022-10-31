const { getbyId, create, deleteById, edit, enroll } = require('../services/tutorialService');
const { parseError } = require('../util/parser');

const tutorialController = require('express').Router();

tutorialController.get('/:id/details', async (req, res) => {
    const tutorial = await getbyId(req.params.id);

    tutorial.isOwner = tutorial.owner.toString() == req.user._id.toString();
    tutorial.usersEnrolled = tutorial.enrolled.map(x => x.toString()).includes(req.user._id.toString());

    res.render('details', {
        tutorial
    });
});

tutorialController.get('/create', (req, res) => {
    res.render('create');
});

tutorialController.post('/create', async (req, res) => {
    const tutorial = {
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        duration: req.body.duration,
        owner: req.user._id
    };

    try {
        if(Object.values(tutorial).some(v => !v)) {
            throw new Error('All fields are required!');
        };
        await create(tutorial);
        res.redirect('/');
    } catch(err) {
        res.render('create', {
            body: tutorial,
            errors: parseError(err)
        })
    }
});

tutorialController.get('/:id/edit', async (req, res) => {
    const tutorial = await getbyId(req.params.id);
    
    if(tutorial.owner.toString() != req.user._id.toString()) {
       return res.redirect('/login');
    }

    res.render('edit', {
        tutorial
    });
});

tutorialController.post('/:id/edit', async (req, res) => {
    const tutorial = await getbyId(req.params.id);
    
    if(tutorial.owner.toString() != req.user._id.toString()) {
       return res.redirect('/login');
    }

    try {
        await edit(req.params.id, req.body);
        res.redirect(`/${req.params.id}/details`);
    } catch(err) {
        res.render('edit', {
            tutorial: req.body,
            errors: parseError(err)
        })
    }
});

tutorialController.get('/:id/delete', async (req, res) => {
    const tutorial = await getbyId(req.params.id);
    
    if(tutorial.owner.toString() != req.user._id.toString()) {
       return res.redirect('/login');
    }

    await deleteById(req.params.id);
    res.redirect('/');
});

tutorialController.get('/:id/enroll', async (req, res) => {
    const tutorial = await getbyId(req.params.id);
    
    if(tutorial.owner.toString() != req.user._id.toString() 
    && tutorial.enrolled.map(x => x.toString()).includes(req.user._id.toString()) == false) {
        await enroll(req.params.id, req.user._id);
    }
    
    return res.redirect(`/${req.params.id}/details`);
});

module.exports = tutorialController;