const { Schema, model, Types} = require('mongoose');

const adSchema = new Schema({
    headline: { type: String, required: true, minlength: 4},
    location: { type: String, required: true, minlength: 8},
    name: { type: String, required: true, minlength: 3},
    description: { type: String, required: true, maxlength: 40},
    author: { type: Types.ObjectId, ref: 'User'},
    users: { type: [Types.ObjectId], ref: 'User', default:[]},
    applied: { type: Number, default: 0}
});

const Ad = model('Ad', adSchema);

module.exports = Ad;

/* •	Headline - string (required),
•	Location - string (required),
•	Company name - string (required),
•	Company description - string (required),
•	Author - object Id (a reference to the User model),
•	Users applied - a collection of Users (a reference to the User model) */
