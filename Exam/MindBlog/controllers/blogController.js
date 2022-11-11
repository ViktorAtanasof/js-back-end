const { hasUser } = require('../middlewares/guards');
const { getAll, createBlog, getById, editBlog, deleteBlog, follow, getUsersFollowed } = require('../services/blogService');
const { getUser } = require('../services/userService');
const { parseError } = require('../util/parser');

const blogController = require('express').Router();

blogController.get('/catalog', async (req, res) => {
    const blogs = await getAll();
    res.render('catalog', {
        blogs
    });
});

blogController.get('/create', hasUser(), (req, res) => {
    res.render('create');
});

blogController.post('/create', hasUser(), async (req, res) => {
    const blog = { ...req.body, owner: req.user._id };

    try {
        await createBlog(blog);
        res.redirect('/catalog');
    } catch (err) {
        res.render('create', {
            body: blog,
            errors: parseError(err)
        });
    }
});

blogController.get('/details/:id', async (req, res) => {
    const blog = await getById(req.params.id);
    const user = await getUser(blog.owner);
    blog.ownerEmail = user.email;
    blog.usersFollowing = await getUsersFollowed(blog._id);
    blog.listUsersFollowing = blog.usersFollowing.join(', ');

    if (req.user != undefined) {
        blog.emailExists = res.locals.email;
        blog.isOwner = blog.owner.toString() == req.user._id.toString();
        blog.usersFollowed = blog.follows.map(v => v.toString().includes(req.user._id.toString())).includes(true);
    };

    res.render('details', {
        blog
    });
});

blogController.get('/edit/:id', hasUser(), async (req, res) => {
    const blog = await getById(req.params.id);

    if (blog.owner.toString() != req.user._id.toString()) {
        return res.redirect('/');
    };

    res.render('edit', {
        blog
    })
});

blogController.post('/edit/:id', hasUser(), async (req, res) => {
    const blog = await getById(req.params.id);

    if (blog.owner.toString() != req.user._id.toString()) {
        return res.redirect('/');
    };

    try {
        await editBlog(req.params.id, req.body);
        res.redirect(`/details/${req.params.id}`);
    } catch (err) {
        res.render('edit', {
            blog: req.body,
            errors: parseError(err)
        })
    }
});

blogController.get('/delete/:id', hasUser(), async (req, res) => {
    const blog = await getById(req.params.id);

    if (blog.owner.toString() != req.user._id.toString()) {
        return res.redirect('/');
    };

    await deleteBlog(req.params.id);
    res.redirect('/catalog');
})

blogController.get('/follow/:id', hasUser(), async (req, res) => {
    const blog = await getById(req.params.id);

    if (blog.owner.toString() != req.user._id.toString()
        && blog.follows.map(v => v.toString()).includes(req.user._id.toString()) == false) {
        await follow(req.params.id, req.user._id);
    };

    return res.redirect(`/details/${req.params.id}`);
});

module.exports = blogController;