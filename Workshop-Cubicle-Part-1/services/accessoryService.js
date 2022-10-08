const Accessory = require('../models/Accessory');

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

}

module.exports = {
    getAllAccessories,
    createAccessory,
    addAccessories
}