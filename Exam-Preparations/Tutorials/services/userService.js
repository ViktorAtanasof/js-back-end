const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const jwtSecret = '228sugfahhwifa';

async function register(username, password) {
    const existing = await User.findOne({ username }).collation({ locale: 'en', strength: 2 });
    if (existing) {
        throw new Error('Username is taken');
    };

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        hashedPassword
    });

    // TODO see assignment if registration creates user session
    return createSession(user);
}

async function login(username, password) {
    const user = await User.findOne({ username }).collation({ locale: 'en', strength: 2 });
    if (!user) {
        throw new Error('Incorrect username or password');
    };

    const hasMatch = await bcrypt.compare(password, user.hashedPassword);
    if (hasMatch == false) {
        throw new Error('Incorrect username or password');
    };

    return createSession(user);
}

function createSession({ _id, username }) {
    const payload = {
        _id,
        username
    };

    return jwt.sign(payload, jwtSecret);
}

function verifyToken(token) {
    return jwt.verify(token, jwtSecret);
}

module.exports = {
    register,
    login,
    verifyToken
}

