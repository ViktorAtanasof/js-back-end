const { createAccessory, getAllAccessories, addAccessories } = require('../services/accessoryService');
const { getById } = require('../services/cubeService');

const accessoryController = require('express').Router();

accessoryController.get('/create/accessory', (req, res) => {
    res.render('createAccessory', {
        title: 'Create New Accessory'
    });
});

accessoryController.post('/create/accessory', async (req, res) => {
    try {
        await createAccessory(req.body.name, req.body.description, req.body.imgUrl);
        res.redirect('/');
    } catch(err) {
        res.render('createAccessory', {
            title: 'Create New Accessory'
        });
    }
});

accessoryController.get('/attach/accessory/:cubeId', async(req, res) => {
    const cubeId = req.params.cubeId;
    const cube = await getById(cubeId);
    const accessories = await getAllAccessories();

    res.render('attachAccessory', {
        title: 'Add Accessory',
        cube,
        accessories
    });
});

accessoryController.post('/attach/accessory/:cubeId', async (req, res) => {
    await addAccessories(req.params.cubeId, Object.keys(req.body));
    res.redirect('/attach/accessory/' + req.params.cubeId);
});

module.exports = accessoryController;