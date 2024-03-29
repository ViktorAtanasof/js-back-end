const { Schema, model} = require('mongoose');

const userSchema = new Schema({
    username: { type: String, required: true, minlength: 2},
    email: { type: String, required: true, minlength: 10},
    hashedPassword: { type: String, required: true}
});

const User = model('User', userSchema);

module.exports = User;