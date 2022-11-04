const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        validate: (email) => {
            const regex = /\b(?<name>[A-Za-z]+)\@(?<domain>[A-Za-z]+)\.(?<extension>[A-Za-z]+)\b/g
            if (!email.match(regex)) {
                throw new Error('The email should be in format: <name>@<domain>.<extension>. Example: "petar@softuni.bg"');
            }
        }},
        skills: { type: String, required: true, maxlength: 40 },
        hashedPassword: { type: String, required: true }
});

const User = model('User', userSchema);

module.exports = User;