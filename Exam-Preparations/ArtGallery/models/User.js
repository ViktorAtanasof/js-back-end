const { Schema, model} = require('mongoose');

const userSchema = new Schema({
    username: { type: String, required: true, minlength: [4, 'Username must be at least 4 characters long'] },
    hashedPassword: { type: String, required: true},
    address: { type:String, required: true, maxlength: [20, 'Address mustn\'t be longer than 20 characters']}
});

const User = model('User', userSchema);

module.exports = User;