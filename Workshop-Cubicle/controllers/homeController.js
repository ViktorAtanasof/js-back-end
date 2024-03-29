const { getAll } = require('../services/cubeService');

const homeController = require('express').Router();

homeController.get('/',  async (req, res) => {
    const search = req.query.search || '';
    const fromLevel = Number(req.query.fromLevel) || 1;
    const toLevel = Number(req.query.toLevel) || 1000;

    const cubes = await getAll(search, fromLevel, toLevel);
    
    if(cubes.length == 0) {
        res.render('noCubes', {
            title: 'Not Available'
        })
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

homeController.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page'
    });
});

module.exports = homeController;