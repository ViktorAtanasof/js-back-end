const { hasUser } = require('../middlewares/guards');
const { getAll, createCrypto, getById, editCrypto, deleteById, buyCrypto } = require('../services/cryptoService');
const { parseError } = require('../util/parser');

const cryptoController = require('express').Router();

cryptoController.get('/crypto', async (req, res) => {
    const cryptos = await getAll();

    res.render('catalog', {
        cryptos
    })
});

cryptoController.get('/create', hasUser(), (req, res) => {
     res.render('create');
});

cryptoController.post('/create', hasUser(), async (req, res) => {
    const crypto = {...req.body, owner: req.user._id};
    try {
        if(Object.values(crypto).some(v => !v)) {
            throw new Error('All fields are required');
        }
        await createCrypto(crypto);
        res.redirect('/crypto');
    } catch(err) {
        res.render('create', {
            body: crypto,
            errors: parseError(err)
        });
    }
});

cryptoController.get('/details/:id', async (req, res) => {
    const crypto = await getById(req.params.id);

    if(req.user != undefined) {
        crypto.userExists = res.locals.email;
        crypto.isOwner = crypto.owner.toString() == req.user._id.toString();  
        crypto.usersBought = crypto.buyers.map(v => v.toString().includes(req.user._id.toString())).includes(true);
    };

    res.render('details', {
        crypto
    });
});

cryptoController.get('/edit/:id', hasUser(), async(req, res) => {
    const crypto = await getById(req.params.id);

    if(crypto.owner.toString() != req.user._id.toString()) {
        return res.redirect('/');
    };

    res.render('edit', {
        crypto
    });
});

cryptoController.post('/edit/:id', hasUser(), async(req, res) => {
    const crypto = await getById(req.params.id);

    if(crypto.owner.toString() != req.user._id.toString()) {
        return res.redirect('/');
    };

    try {
        await editCrypto(req.params.id, req.body);
        res.redirect(`/details/${req.params.id}`);
    } catch(err) {
        res.render('edit', {
            crypto: req.body,
            errors: parseError(err)
        });
    }
});

cryptoController.get('/delete/:id', hasUser(), async(req, res) => {
    const crypto = await getById(req.params.id);

    if(crypto.owner.toString() != req.user._id.toString()) {
        return res.redirect('/');
    };

    await deleteById(req.params.id);
    res.redirect('/crypto');
});

cryptoController.get('/buy/:id', hasUser(), async(req, res) => {
    const crypto = await getById(req.params.id);

    if(crypto.owner.toString() != req.user._id.toString()
    && crypto.buyers.map(v => v.toString()).includes(req.user._id.toString()) == false) {
        await buyCrypto(req.params.id, req.user._id);
    };

    return res.redirect(`/details/${req.params.id}`);
});
module.exports = cryptoController;