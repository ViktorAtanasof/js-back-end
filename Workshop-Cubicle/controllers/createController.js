const { create } = require('../services/cubeService');

const createController = require('express').Router();

createController.get('/', (req, res) => {
    res.render('create', {
        title: 'Create Page'
    });
});

createController.post('/', async (req, res) => {
    try {
        //throw new Error('Validation failed');
        const result = await create(req.body);
        res.redirect('/details/' + result.id);
    } catch (err) {
        res.render('create', {
            title: 'Request Error',
            error: err.message
        })
    }
});

module.exports = createController;
