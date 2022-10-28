const { hasUser } = require('../middlewares/guards');
const { createPost, getAll, getById, editPost, deleteById, upVote, downVote } = require('../services/postService');
const { getAuthor } = require('../services/userService');
const { parseError } = require('../util/parser');

const postController = require('express').Router();


postController.get('/posts', async (req, res) => {
    const posts = await getAll();

    res.render('all-posts', {
        posts
    });
});

postController.get('/create', hasUser(), (req, res) => {
    res.render('create');
});

postController.post('/create', hasUser(), async (req, res) => {
    const post = {
        title: req.body.title,
        keyword: req.body.keyword,
        location: req.body.location,
        createdAt: req.body.createdAt,
        imgUrl: req.body.imgUrl,
        description: req.body.description,
        author: req.user._id
    };

    try {
        if(Object.values(post).some(v => !v)) {
            throw new Error('All fields are required!');
        };
        await createPost(post);
        res.redirect('/posts');
    } catch(err) {
        res.render('create', {
            body: post,
            errors: parseError(err)
        });
    }
});

postController.get('/details/:id', async (req, res) => {
    const post = await getById(req.params.id);

    if(req.user != undefined) {
        post.emailExists = res.locals.email;
        post.isOwner = post.author.toString() == req.user._id.toString();  
        post.usersVoted = post.votes.map(v => v.toString().includes(req.user._id.toString())).includes(true);

        const user = await getAuthor(post.author);
        post.authorName = user.firstName + ' ' + user.lastName;
    }
    if(post.votes.length > 0) {
        post.anyVotes = true;
    };


    res.render('details', {
        post
    })
});

postController.get('/edit/:id', hasUser(), async (req, res) => {
    const post = await getById(req.params.id);

    if(post.author.toString() != req.user._id.toString()) {
        return res.redirect('/');
    };

    res.render('edit', {
        post
    })
});

postController.post('/edit/:id', hasUser(), async (req, res) => {
    const post = await getById(req.params.id);

    if(post.author.toString() != req.user._id.toString()) {
        return res.redirect('/');
    };

    try {
        await editPost(req.params.id, req.body);
        res.redirect(`/details/${req.params.id}`);
    } catch(err) {
        res.render('edit', {
            post: req.body,
            errors: parseError(err)
        })
    }
});

postController.get('/delete/:id', hasUser(), async (req, res) => {
    const post = await getById(req.params.id);

    if(post.author.toString() != req.user._id.toString()) {
        return res.redirect('/');
    };

    await deleteById(req.params.id);
    res.redirect('/posts');
});

postController.get('/upvote/:id', hasUser(), async (req, res) => {
    const post = await getById(req.params.id);


    if(post.author.toString() != req.user._id.toString() 
    && post.votes.map(x => x.toString()).includes(req.user._id.toString()) == false) {
        await upVote(req.params.id, req.user._id);
    }
    
    return res.redirect(`/details/${req.params.id}`);
});

postController.get('/downvote/:id', hasUser(), async (req, res) => {
    const post = await getById(req.params.id);


    if(post.author.toString() != req.user._id.toString() 
    && post.votes.map(x => x.toString()).includes(req.user._id.toString()) == false) {
        await downVote(req.params.id, req.user._id);
    }
    
    return res.redirect(`/details/${req.params.id}`);
});

module.exports = postController;