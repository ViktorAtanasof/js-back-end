const { getAllByDate, getAllRecent } = require('../services/tutorialService');

const homeController = require('express').Router();


homeController.get('/', async (req, res) => {
    let view;
    let tutorials = [];

    if(req.user) {
        view = 'user-home';
        tutorials = await getAllByDate(req.query.search);
    } else {
        view = 'guest-home';
        tutorials = await getAllRecent();
    };

    res.render(view, {
        tutorials,
        search: req.query.search
    });
});

module.exports = homeController;