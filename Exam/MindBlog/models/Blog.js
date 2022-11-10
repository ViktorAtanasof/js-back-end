const { Schema, model, Types } = require('mongoose');

const blogSchema = new Schema({
    title: { type: String, required: true, minlength: 5, maxlength: 50 },
    image: { type: String, required: true, validate: /^https?:\/\//i },
    content: { type: String, required: true, minlength: 10 },
    category: { type: String, required: true, minlength: 3 },
    follows: { type: [Types.ObjectId], ref: 'User', default: [] },
    owner: { type: Types.ObjectId, ref: 'User' }
});

const Blog = model('Blog', blogSchema);

module.exports = Blog;
