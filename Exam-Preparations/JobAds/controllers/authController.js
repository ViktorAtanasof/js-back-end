const { isGuest, hasUser } = require('../middlewares/guards');
const { register, login } = require('../services/userService');
const { parseError } = require('../util/parser');

const authController = require('express').Router();

authController.get('/register', isGuest(), (req, res) => {
    res.render('register');
});

authController.post('/register', isGuest(), async (req, res) => {
    try {
        if(req.body.email == '' || req.body.password == '' || req.body.skills == '') {
            throw new Error('All fields are required');
        };
        if(req.body.password.length < 5 ) {
            throw new Error('Password must be at least 5 characters long');
        }
        if(req.body.password != req.body.repass) {
            throw new Error('Passwords don\'t match');
        };
        const token = await register(req.body.email, req.body.skills, req.body.password);

        res.cookie('token', token);
        res.redirect('/');
    } catch (err) {
        res.render('register', {
            errors: parseError(err),
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
    } catch (err) {
        res.render('login', {
            errors: parseError(err),
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