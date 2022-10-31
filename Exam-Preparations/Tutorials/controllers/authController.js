const { register, login } = require('../services/userService');
const { body, validationResult } = require('express-validator');
const { parseError } = require('../util/parser');

const authController = require('express').Router();

authController.get('/register', (req, res) => {
    // TODO replace with actual view by assignment
    res.render('register');
});

authController.post('/register',
    body('username')
        .isLength({ min: 5 }).withMessage('Username must be at least 5 characters')
        .isAlphanumeric().withMessage('Username must contain only english letters and numbers'),
    body('password')
        .isLength({ min: 5 }).withMessage('Password must be at least 5 characters')
        .isAlphanumeric().withMessage('Password must contain only english letters and numbers'),
    async (req, res) => {
        try {
            const { errors } = validationResult(req);
            if (errors.length > 0) {
                throw errors;
            }

            if (req.body.username == '' || req.body.password == '') {
                throw new Error('All fields are required');
            };
            if (req.body.password != req.body.rePassword) {
                throw new Error('Passwords don\'t match');
            };
            const token = await register(req.body.username, req.body.password);
            // TODO check assignment if register creates session
            res.cookie('token', token);
            res.redirect('/'); // TODO replace redirect by assignment
        } catch (error) {
            const errors = parseError(error);
            // TODO add error display to actual template from assignment
            res.render('register', {
                errors,
                body: {
                    username: req.body.username
                }
            });
        }
    });

authController.get('/login', (req, res) => {
    // TODO replace with actual view by assignment
    res.render('login');
});

authController.post('/login', async (req, res) => {
    try {
        const token = await login(req.body.username, req.body.password);

        res.cookie('token', token);
        console.log(req.locals);
        res.redirect('/'); // TODO replace redirect by assignment
    } catch (error) {
        const errors = parseError(error);
        // TODO add error display to actual template from assignment
        res.render('login', {
            errors,
            body: {
                username: req.body.username
            }
        });
    }
});

authController.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
})

module.exports = authController;