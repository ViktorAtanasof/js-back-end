const Blog = require("../models/Blog");
const { getUser } = require("./userService");

async function getLastThree() {
    return Blog.find().sort({_id: -1}).limit(3).lean();
};

async function getAll() {
    return Blog.find().lean();
};

async function getById(id) {
    return Blog.findById(id).lean();
};

async function createBlog(blog) {
    return Blog.create(blog);
};

async function editBlog(blogId, blog) {
    return Blog.findByIdAndUpdate(blogId, blog);
};

async function deleteBlog(blogId) {
    return Blog.findByIdAndDelete(blogId);
};

async function follow(blogId, userId) {
    const existing = await Blog.findById(blogId);
    existing.follows.push(userId);

    return existing.save();
};

async function getUsersFollowed(blogId) {
    const blog = await getById(blogId);
    const usersFollowing = blog.follows;

    const users = [];

    for (const user of usersFollowing) {
        const { email } = await getUser(user);

        users.push(email);
    }
    
    return users;
};

async function getByUserFollow(userId) {
    return Blog.find({ follows: userId }).lean();
};

async function getByUserCreation(userId) {
    return Blog.find({ owner: userId }).lean();
};

module.exports = {
    getLastThree,
    getAll,
    getById,
    createBlog,
    editBlog,
    deleteBlog,
    follow,
    getUsersFollowed,
    getByUserFollow,
    getByUserCreation
}