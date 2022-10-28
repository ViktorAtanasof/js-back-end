const { register, login } = require('../services/userService');
const { parseError } = require('../util/parser');
const validator = require('validator');
const { hasUser, isGuest } = require('../middlewares/guards');

const authController = require('express').Router();

authController.get('/register', isGuest(), (req, res) => {
    
    res.render('register', {
        title: 'Register Page'
    });
});

authController.post('/register', isGuest(), async (req, res) => {
    try {
        if(req.body.firstName == '' || req.body.lastName == '' ||req.body.password == '') {
            throw new Error('All fields are required');
        };
        if(validator.default.isAlpha(req.body.firstName) == false) {
            throw new Error('First name should be at least 3 characters long and contain only English letters');
        };
        if(validator.default.isAlpha(req.body.lastName) == false) {
            throw new Error('Last name should be at least 3 characters long and contain only English letters');
        };
        if(validator.default.isEmail(req.body.email) == false) {
            throw new Error('Invalid email');
        };
        if(req.body.password != req.body.repass) {
            throw new Error('Passwords don\'t match');
        };
        const token = await register(req.body.firstName, req.body.lastName, req.body.email, req.body.password);
        res.cookie('token', token);
        res.redirect('/');
    } catch (error) {
        console.log(req.body);
        const errors = parseError(error);
        res.render('register', {
            errors,
            body: {
                email: req.body.email
            }
        });
    }
});

authController.get('/login', isGuest(), (req, res) => {
    res.render('login');
});

authController.post('/login', isGuest(), async (req, res) => {
    try {
        const token = await login(req.body.email, req.body.password);

        res.cookie('token', token);
        res.redirect('/');
    } catch (error) {
        const errors = parseError(error);
        res.render('login', {
            errors,
            body: {
                email: req.body.email
            }
        });
    }
});

authController.get('/logout', hasUser(), (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
})

module.exports = authController;