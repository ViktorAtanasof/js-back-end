const { create } = require('../services/cubeService');

const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('create', {
        title: 'Create Page'
    });
});

router.post('/', async (req, res) => {
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

module.exports = router;
