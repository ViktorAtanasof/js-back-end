const { Schema, model} = require('mongoose');

const userSchema = new Schema({
    name: { type: String, required: true},
    username: { type: String, required: true, minlength: 5},
    hashedPassword: { type: String, required: true}
});

const User = model('User', userSchema);

module.exports = User;