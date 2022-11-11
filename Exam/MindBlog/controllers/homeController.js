const { hasUser } = require('../middlewares/guards');
const { getLastThree, getByUserFollow, getByUserCreation } = require('../services/blogService');
const { getUser } = require('../services/userService');

const homeController = require('express').Router();

homeController.get('/', async (req, res) => {
    const blogs = await getLastThree();
    res.render('home', {
        blogs
    });
});

homeController.get('/profile', hasUser(), async( req, res) => {
    const followed = await getByUserFollow(req.user._id);
    const creations = await getByUserCreation(req.user._id);
    const user = await getUser(req.user._id);
    
    res.render('profile', {
        user,
        followed,
        creations
    });
});

module.exports = homeController;