const { Schema, model} = require('mongoose');


const userSchema = new Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true
    },
    hashedPassword: { 
        type: String, 
        required: true
    }
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