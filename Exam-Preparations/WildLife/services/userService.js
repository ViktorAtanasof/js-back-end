const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const jwtSecret = '228sugfahhwifa';

async function register(firstName, lastName, email, password) {
    const existing = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });
    if (existing) {
        throw new Error('Email is taken');
    };

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        firstName,
        lastName,
        email,
        hashedPassword
    });

    return createSession(user);
}

async function login(email, password) {
    const user = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });
    if (!user) {
        throw new Error('Incorrect email or password');
    };

    const hasMatch = await bcrypt.compare(password, user.hashedPassword);
    if (hasMatch == false) {
        throw new Error('Incorrect email or password');
    };

    return createSession(user);
}

function createSession({ _id, email }) {
    const payload = {
        _id,
        email
    };

    return jwt.sign(payload, jwtSecret);
}

function verifyToken(token) {
    return jwt.verify(token, jwtSecret);
}

async function getUser(userId) {
    return User.findById(userId);
}

module.exports = {
    register,
    login,
    verifyToken,
    getAuthor: getUser
}

