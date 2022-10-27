const Publish = require("../models/Publish")

async function getAll() {
    return Publish.find({}).lean();
};

async function getById(id) {
    return Publish.findById(id).lean();
};

async function createArt(art) {
    return Publish.create(art);
};

async function editArt(artId, art) {
    const existing = await Publish.findById(artId);

    existing.title = art.title;
    existing.tech = art.tech;
    existing.certificate = art.certificate;
    existing.picture = art.picture;

    return existing.save();
};

async function deleteArtById(id) {
    return Publish.findByIdAndDelete(id);
};

async function share(artId, userId) {
    const existing = await Publish.findById(artId);
    existing.shares.push(userId);
    existing.amount++;

    return existing.save();
};

async function getByUserShare(userId) {
    return Publish.find({ shares: userId }).lean();
};

module.exports = {
    getAll,
    getById,
    createArt,
    editArt,
    deleteArtById,
    share,
    getByUserShare
}