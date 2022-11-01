const { Schema, model, Types } = require('mongoose');

const housingSchema = new Schema({
    name: { type: String, required: true, minlength: 6 },
    type: { type: String, required: true, enum: ['Apartment', 'Villa', 'House'] },
    year: { type: Number, required: true, min: 1850, max: 2021 },
    city: { type: String, required: true, minlength: 4 },
    imgUrl: { type: String, required: true, validate:/^https?:\/\//i },
    description: { type: String, required: true, maxlength: 60 },
    available: { type: Number, required: true, min:0, max:10 },
    rents: { type: [Types.ObjectId], ref: 'User', default: [] },
    owner: { type: Types.ObjectId, ref: 'User' }
});

const Housing = model('Housing', housingSchema);

module.exports = Housing;

/* •	Name - string (required),
•	Type - string (“Apartment”, “Villa”, “House”) required,
•	Year - number (required),
•	City – string (required),
•	Home Image - string (required),
•	Property Description - string (required),
•	Available pieces - number(required)
•	Rented a home - a collection of Users (reference to the User model)
•	Owner - object Id (reference to the User model) */
