const Housing = require("../models/Housing");
const User = require("../models/User");


async function getAll() {
    return Housing.find({}).lean();
};

async function getFirstThree() {
    return Housing.find().sort({_id: -1}).limit(3).lean();
};

async function getById(id) {
    return Housing.findById(id).lean();
};

async function createRent(house) {
    return Housing.create(house);
};

async function editRent(houseId, house) {
    const existing = await Housing.findById(houseId);

    existing.name = house.name;
    existing.type = house.type;
    existing.year = house.year;
    existing.city = house.city;
    existing.imgUrl = house.imgUrl;
    existing.description = house.description;
    existing.available = house.available;

    return existing.save();
};

async function deleteRentById(id) {
    return Housing.findByIdAndDelete(id);
};

async function rent(houseId, userId) {
    const existing = await Housing.findById(houseId);
    existing.rents.push(userId);
    existing.available--;

    return existing.save();
};
/* async function getRentingPeople(id, userId) {
    const house = await Housing.findById(id);
    const peopleRentingHouse = house.rents;
    let nameArray = peopleRentingHouse.map(async (userId) => {
        const user = await User.findById(userId);
        return user.name;
    });
    return nameArray;
} */

async function search(type) {
    return Housing.find({ type: type}).lean();
}

module.exports = {
    getAll,
    getFirstThree,
    getById,
    createRent,
    editRent,
    deleteRentById,
    rent,
    /* getRentingPeople, */
    search
}
