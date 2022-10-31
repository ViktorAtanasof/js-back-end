const { Schema, model, Types } = require('mongoose');

const urlPattern = /^https?:\/\/.+$/i;

const courseSchema = new Schema({
    title: { type: String, required: true, unique: true, minlength: [4, 'Title must be at least 4 characters long'] },
    description: {
        type: String,
        required: true,
        minlength: [20, 'Description must be at least 20 symbols'],
        maxlength: [50, 'Description must be less than 50 symbols']
    },
    imageUrl: {
        type: String, required: true, validate: {
            validator: (value) => urlPattern.test(value),
            message: 'Image URL is not valid'
        }
    },
    duration: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now},
    enrolled: { type: [Types.ObjectId], ref: 'User', default: [] },
    enrolledCount: { type: Number, default: 0 },
    owner: { type: Types.ObjectId, ref: 'User' }
});

courseSchema.index({ title: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const Course = model('Course', courseSchema);

module.exports = Course;