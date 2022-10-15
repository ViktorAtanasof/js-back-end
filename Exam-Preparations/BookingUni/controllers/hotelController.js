const { create } = require('../services/hotelService');
const { parseError } = require('../util/parser');

const hotelController = require('express').Router();

hotelController.get('/:id/details', (req, res) => {
    res.render('details', {
        title: 'Details Page'
    });
});

hotelController.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create Hotel'
    });
});

hotelController.post('/create', async (req, res) => {
    const hotel = {
        name: req.body.name,
        city: req.body.city,
        imageUrl: req.body.imageUrl,
        rooms: Number(req.body.rooms),
        owner: req.user._id
    };

    try {
        if(Object.values(hotel).some(v => !v)) {
            throw new Error('All fields are required');
        }
        await create(hotel);
        res.redirect('/');
    } catch (err) {
        res.render('create', {
            title: 'Create Hotel',
            body: hotel,
            errors: parseError(err)
        });
    }
});

hotelController.get('/:id/edit', (req, res) => {
    res.render('edit', {
        title: 'Edit Page'
    });
});

module.exports = hotelController;