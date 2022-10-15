const hotelController = require('express').Router();

hotelController.get('/:id/details', (req, res) => {
    res.render('details', {
        title: 'Details Page'
    });
});

hotelController.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create Page'
    });
});

hotelController.get('/:id/edit', (req, res) => {
    res.render('edit', {
        title: 'Edit Page'
    });
});

module.exports = hotelController;