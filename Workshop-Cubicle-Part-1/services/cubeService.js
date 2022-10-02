const fs = require('fs');

const filename = './models/data.json';
const data = JSON.parse(fs.readFileSync(filename));

async function persist() {
    return new Promise((res, rej) => {
        fs.writeFile(filename, JSON.stringify(data), (err) => {
            if (err == null) {
                res();
            } else {
                rej(err);
            }
        })
    })
}

function getAll(search, fromLevel, toLevel) {
    return data
        .filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
        .filter(c => c.level >= fromLevel && c.level <= toLevel);
}

function getById(id) {
    return data.find(i => i.id == id);
}

async function create(cubeId) {
    const cube = {
        id: getId(),
        name: cubeId.name,
        description: cubeId.description,
        imgUrl: cubeId.imgUrl,
        level: Number(cubeId.level)
    }

    if (Object.values(cube).some(v => !v)) {
        throw new Error('All fields are required!');
    }
    data.push(cube);
    await persist();
    return cube;
}

function getId() {
    return ('000000' + Math.random() * 999999 | 0).toString(16).slice(-6);
}

module.exports = {
    getAll,
    getById,
    create
}