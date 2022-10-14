const { Schema, model} = require('mongoose');

// TODO add user properties and validation according to assignment
const userSchema = new Schema({
    username: { type: String, required: true, unique: true, minlength: [3, 'Username must be at least 3 characters long']},
    hashedPassword: { type: String, required: true}
});

// Compound index if needed (it is combined with the { unique: true } parameter)
userSchema.index({ username: 1}, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = User;