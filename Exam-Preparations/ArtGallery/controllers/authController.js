const { isGuest, hasUser } = require('../middlewares/guards');
const { register, login } = require('../services/userService');
const { parseError } = require('../util/parser');

const authController = require('express').Router();

authController.get('/register', isGuest(), (req, res) => {
    res.render('register');
});

authController.post('/register', isGuest(), async (req, res) => {
    try {
        if(req.body.username == '' || req.body.password == '' || req.body.address == '') {
            throw new Error('All fields are required');
        };
        if(req.body.password != req.body.repass) {
            throw new Error('Passwords don\'t match');
        };
        if(req.body.password.length < 3) {
            throw new Error('Passwords must be at least 3 characters long');
        };
        const token = await register(req.body.username, req.body.password, req.body.address);
        res.cookie('token', token);
        res.redirect('/'); 
    } catch (error) {
        res.render('register', {
            errors: parseError(error),
            body: {
                username: req.body.username
            }
        });
    }
});

authController.get('/login', isGuest(), (req, res) => {
    res.render('login');
});

authController.post('/login', isGuest(), async (req, res) => {
    try {
        const token = await login(req.body.username, req.body.password);

        res.cookie('token', token);
        res.redirect('/');
    } catch (error) {
        res.render('login', {
            errors: parseError(error),
            body: {
                username: req.body.username
            }
        });
    }
});

authController.get('/logout', hasUser(), (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
})

module.exports = authController;