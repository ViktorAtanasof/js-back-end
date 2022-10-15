const Hotel = require("../models/Hotel");


async function getAll() {

};

async function getById(id) {
    
};

async function create(hotel) {
    return await Hotel.create(hotel);
};

async function edit(id, hotel) {
    
};

async function deleteById(id) {
    
};

async function bookRoom(hotelId, userId) {
    
};

module.exports = {
    getAll,
    getById,
    create,
    edit,
    deleteById,
    bookRoom
}