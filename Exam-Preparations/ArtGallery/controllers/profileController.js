const { hasUser } = require('../middlewares/guards');
const { getByUserShare } = require('../services/artService');
const { getUser } = require('../services/userService');

const profileController = require('express').Router();

profileController.get('/profile', hasUser() ,async(req, res) => {
    const shared = await getByUserShare(req.user._id);
    const sharedPosts = [];
    shared.map(o => sharedPosts.push(o.title));
    const user = await getUser(req.user._id);
    
    console.log(shared);
    res.render('profile', {
        user,
        sharedPosts: sharedPosts.join(', ')
    });
});

module.exports = profileController;