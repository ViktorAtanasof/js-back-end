const { hasUser } = require('../middlewares/guards');
const { getAll, createRent, getById, editRent, deleteRentById, rent, getRentingPeople, search } = require('../services/housingService');
const { parseError } = require('../util/parser');

const rentController = require('express').Router();

rentController.get('/catalog', async (req, res) => {
    const houses = await getAll();

    res.render('catalog/aprt', {
        houses
    })
});

rentController.get('/create', hasUser(), (req, res) => {
    res.render('catalog/create');
});

rentController.post('/create', hasUser(), async (req, res) => {
    const house = {...req.body, owner: req.user._id};
    try {
        if(Object.values(house).some(v => !v)) {
            throw new Error('All fields are required');
        };
        await createRent(house);
        res.redirect('/catalog');
    } catch(err) {
        res.render('catalog/create', {
            body: house,
            errors: parseError(err)
        });
    };
});

rentController.get('/details/:id', async(req, res) => {
    const house = await getById(req.params.id);
    if(house.available == 0) {
        house.noHousing = true;
    } 
    if(req.user != undefined) {
        house.usernameExists = res.locals.username;
        house.isOwner = house.owner.toString() == req.user._id.toString();  
        house.usersRented = house.rents.map(v => v.toString().includes(req.user._id.toString())).includes(true);
    };
/* 
    const nameArray = await getRentingPeople(req.params.id, req.user._id);
    house.names = await (await Promise.all(nameArray)).join(', '); */

    res.render('catalog/details', {
        house
    })
});

rentController.get('/edit/:id', hasUser(), async(req, res) => {
    const house = await getById(req.params.id);

    if(house.owner.toString() != req.user._id.toString()) {
        return res.redirect('/');
    };

    res.render('catalog/edit', {
        house
    });
});

rentController.post('/edit/:id', hasUser(), async(req, res) => {
    const house = await getById(req.params.id);

    if(house.owner.toString() != req.user._id.toString()) {
        return res.redirect('/');
    };

    try {
        await editRent(req.params.id, req.body);
        res.redirect(`/details/${req.params.id}`);
    } catch(err) {
        res.render('catalog/edit', {
            house: req.body,
            errors: parseError(err)
        })
    }
});

rentController.get('/delete/:id', hasUser(), async(req, res) => {
    const house = await getById(req.params.id);

    if(house.owner.toString() != req.user._id.toString()) {
        return res.redirect('/');
    };

    await deleteRentById(req.params.id);
    res.redirect('/catalog');
});

rentController.get('/rent/:id', hasUser(), async(req, res) => {
    const house = await getById(req.params.id);

    if(house.owner.toString() != req.user._id.toString()
    && house.rents.map(v => v.toString()).includes(req.user._id.toString()) == false) {
        await rent(req.params.id, req.user._id);
    };


    return res.redirect(`/details/${req.params.id}`);
});

rentController.get('/search', hasUser(), (req, res) => {
    res.render('search');
});

rentController.post('/search', hasUser(), async (req, res) => {
    let type = req.body.type;
    type = type.charAt(0).toUpperCase() + type.slice(1);
    const houses = await search(type);
    res.render('search', {
        houses
    });
});

module.exports = rentController;