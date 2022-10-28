const { Schema, model, Types } = require('mongoose');

const postSchema = new Schema({
    title: { type: String, required: true},
    keyword: { type: String, required: true},
    location: { type: String, required: true},
    createdAt: { type: String, required: true},
    imgUrl: { type: String, required: true},
    description: { type: String, required: true},
    author: { type: Types.ObjectId, ref:'User'},
    votes: { type: [Types.ObjectId], ref:'User', default:[]},
    rating: { type: Number, default: 0}
});

const Post = model('Post', postSchema);

module.exports = Post;