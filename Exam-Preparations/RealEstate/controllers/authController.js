const { hasUser, isGuest } = require('../middlewares/guards');
const { register, login } = require('../services/userService');
const { parseError } = require('../util/parser');

const authController = require('express').Router();

authController.get('/register', isGuest(), (req, res) => {
    res.render('auth/register');
});

authController.post('/register', isGuest(), async (req, res) => {
    try {
        if(req.body.password.length < 4) {
            throw new Error('Password must be at least 4 characters long!');
        }
        if(req.body.username == '' || req.body.password == '' || req.body.name == '') {
            throw new Error('All fields are required');
        };
        if(req.body.password != req.body.repass) {
            throw new Error('Passwords don\'t match');
        };
        const token = await register(req.body.name, req.body.username, req.body.password);
        res.cookie('token', token);
        res.redirect('/'); 
    } catch (error) {
        res.render('auth/register', {
            errors: parseError(error),
            body: {
                username: req.body.username
            }
        });
    }
});

authController.get('/login', isGuest(), (req, res) => {
    res.render('auth/login');
});

authController.post('/login', isGuest(), async (req, res) => {
    try {
        const token = await login(req.body.username, req.body.password);

        res.cookie('token', token);
        res.redirect('/');
    } catch (error) {
        res.render('auth/login', {
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