const { getById } = require('../services/cubeService');

const router = require('express').Router();

router.get('/:id', async (req, res) => {
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

module.exports = router;
