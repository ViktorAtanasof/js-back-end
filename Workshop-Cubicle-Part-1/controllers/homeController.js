const { getAll } = require('../services/cubeService');

const router = require('express').Router();

router.get('/', (req, res) => {
    const search = req.query.search || '';
    const fromLevel = Number(req.query.fromLevel) || 1;
    const toLevel = Number(req.query.toLevel) || 1000;

    const cubes = getAll(search, fromLevel, toLevel);
    
    if(cubes.length == 0) {
        res.redirect('/');
    } else {
        res.render('home', {
            title: 'Home Page',
            cubes,
            search,
            fromLevel,
            toLevel
        });
    }
});

router.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page'
    });
});

module.exports = router;