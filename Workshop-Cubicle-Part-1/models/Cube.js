const { Schema, model } = require('mongoose');

const cubeSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    imgUrl: { type: String },
    level: { type: Number, required: true, min: 1 }
});

const Cube = model('Cube', cubeSchema);

module.exports = Cube;