const Cube = require('../models/Cube');

function getAll(search, fromLevel, toLevel) {
    return Cube.find({}).lean();
}

function getById(id) {
    return Cube.findById(id).lean();
}

async function create(cubeId) {
    const cube = {
        name: cubeId.name,
        description: cubeId.description,
        imgUrl: cubeId.imgUrl,
        level: Number(cubeId.level)
    }

    if (Object.values(cube).some(v => !v)) {
        throw new Error('All fields are required!');
    }
    
    const result = await Cube.create(cube);

    return cube;
}

module.exports = {
    getAll,
    getById,
    create
}