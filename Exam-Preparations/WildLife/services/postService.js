const Post = require("../models/Post");

async function getAll() {
    return Post.find({}).lean();
};

async function getById(id) {
    return Post.findById(id).lean();
};

async function createPost(post) {
    return Post.create(post);
};

async function editPost(postId, post) {
    const existing = await Post.findById(postId);

    existing.title = post.title;
    existing.keyword = post.keyword;
    existing.location = post.location;
    existing.createdAt = post.createdAt;
    existing.imgUrl = post.imgUrl;
    existing.description = post.description;

    return existing.save();
};

async function deleteById(id) {
    return Post.findByIdAndDelete(id);
};

async function upVote(postId, userId) {
    const existing = await Post.findById(postId);
    existing.votes.push(userId);
    existing.rating++;

    return existing.save();
};

async function downVote(postId, userId) {
    const existing = await Post.findById(postId);
    existing.votes.push(userId);
    existing.rating--;

    return existing.save();
};

module.exports = {
    getAll,
    getById,
    createPost,
    editPost,
    deleteById,
    upVote,
    downVote
}