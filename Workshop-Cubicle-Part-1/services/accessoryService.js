const Accessory = require('../models/Accessory');
const Cube = require('../models/Cube');

async function getAllAccessories() {
    return Accessory.find({}).lean();
}

async function createAccessory(name, description, imgUrl) {
    return Accessory.create({
        name,
        description,
        imgUrl
    });
}

async function addAccessories(cubeId, accessoryIds) {
    const cube = await Cube.findById(cubeId);
    const accessories = await Accessory.find({ _id: { $in: accessoryIds } });

    const toRemove = cube.accessories.filter(c => accessories.every(x => x._id != c._id));

    const newlyAdded = accessories.filter(c => cube.accessories.every(x => x._id != c._id));

    newlyAdded.forEach(c => {
        cube.accessories.push(c);
        c.cubes.push(cube);
    });

    await cube.save();
    await Promise.all(newlyAdded.map(c => c.save()));
}

module.exports = {
    getAllAccessories,
    createAccessory,
    addAccessories
}