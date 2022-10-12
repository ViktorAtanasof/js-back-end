const { getById } = require('../services/cubeService');

const detailsController = require('express').Router();

detailsController.get('/:id', async (req, res) => {
    const cubeId = req.params.id;
    const cube = await getById(cubeId);
    if (cube) {
        res.render('details', {
            title: 'Details Page',
            cube
        });
    } else {
        res.render('cubeNotFound', {
            title: 'Room Not Found',
            cubeId
        });
    }
});

module.exports = detailsController;
