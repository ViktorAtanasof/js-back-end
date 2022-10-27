const { Schema, model, Types } = require('mongoose');

const urlPattern = /^https?:\/\/.+$/i; //Without displaying an error : { validate: /^https?:\/\//i } 

const publishSchema = new Schema({
    title: { type: String, required: true, minlength: [6, 'Title must be at least 6 characters long'] },
    tech: { type: String, required: true, maxlength: [15, 'Technique mustn\'t be longer than 15 characters'] },
    picture: { 
        type: String, 
        required: true, 
        validate: {
        validator: (value) => urlPattern.test(value),
        message: 'Image URL is not valid'
    } },
    certificate: { 
        type: String, 
        required: true, 
        enum: {
        values: ['Yes', 'No'],
        message: 'The Certificate of authenticity must be value "Yes" or "No"'
      } },
    author: { type: Types.ObjectId, ref: 'User' },
    shares: { type: [Types.ObjectId], ref: 'User', default: [] },
    amount: {type: Number, default: 0}
});

const Publish = model('Publish', publishSchema);

module.exports = Publish;