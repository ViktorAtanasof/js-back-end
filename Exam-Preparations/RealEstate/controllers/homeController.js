const { getFirstThree } = require('../services/housingService');

const homeController = require('express').Router();

homeController.get('/', async (req, res) => {
    const houses = await getFirstThree();
    res.render('home', {
        houses
    });
});

module.exports = homeController;