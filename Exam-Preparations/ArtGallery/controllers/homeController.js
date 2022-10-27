const { getAll } = require('../services/artService');

const homeController = require('express').Router();

homeController.get('/', async (req, res) => {
    const arts = await getAll();

    res.render('home', {
        arts
    })
});

module.exports = homeController;