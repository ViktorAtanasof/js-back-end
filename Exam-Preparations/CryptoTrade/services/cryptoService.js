const Crypto = require("../models/Crypto")

async function getAll() {
    return Crypto.find({}).lean();
};

async function getById(id) {
    return Crypto.findById(id).lean();
};

async function createCrypto(crypto) {
    return Crypto.create(crypto);
};

async function editCrypto(cryptoId, crypto) {
    return Crypto.findByIdAndUpdate(cryptoId, crypto, { runValidators: true });
    /* const existing = await Crypto.findById(cryptoId);

    existing.name = crypto.name;
    existing.image = crypto.image;
    existing.price = crypto.price;
    existing.description = crypto.description;
    existing.paymentMethod = crypto.paymentMethod;

    return existing.save(); */
};

async function deleteById(id) {
    return Crypto.findByIdAndDelete(id);
};

async function buyCrypto(cryptoId, userId) {
    const existing = await Crypto.findById(cryptoId);
    existing.buyers.push(userId);

    return existing.save();
};

module.exports = {
    getAll,
    getById,
    createCrypto,
    editCrypto,
    deleteById,
    buyCrypto
}