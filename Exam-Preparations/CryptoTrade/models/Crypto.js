const { Schema, model, Types} = require('mongoose');

const cryptoSchema = new Schema({
    name: { type: String, required: true, minlength: 2},
    image: { type: String, required: true, validate: /^https?:\/\//i},
    price: { type: Number, required: true, min: 0},
    description: { type: String, required: true, minlength: 10},
    paymentMethod: { type: String, required: true, enum: ['crypto-wallet', 'credit-card', 'debit-card', 'paypal']},
    buyers: { type: [Types.ObjectId], ref: 'User', default:[]},
    owner: { type: Types.ObjectId, ref: 'User'}
});

const Crypto = model('Crypto', cryptoSchema);

module.exports = Crypto;

/* •	Name - String (required),
•	Image: String (required),
•	Price: Number (required),
•	Crypto Description: String (required),
•	Payment Method: String (crypto-wallet, credit-card, debit-card, paypal) required,
•	Buy a crypto - a collection of Users (a reference to the User model)
•	Owner - object Id (a reference to the User model) */
