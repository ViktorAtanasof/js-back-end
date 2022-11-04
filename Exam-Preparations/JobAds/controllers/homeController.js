const { getFirstThree } = require('../services/adService');

const homeController = require('express').Router();

homeController.get('/', async (req, res) => {
    const ads = await getFirstThree();
    res.render('home', {
        ads
    });
});

module.exports = homeController;