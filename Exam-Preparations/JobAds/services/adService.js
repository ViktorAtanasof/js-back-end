const Ad = require("../models/Ad");
const { getUser } = require("./userService");

async function getAll() {
    return Ad.find({}).lean();
};

async function getFirstThree() {
    return Ad.find().limit(3).lean();
};

async function getById(id) {
    return Ad.findById(id).lean();
};

async function createAd(ad) {
    return Ad.create(ad);
};

async function editAd(adId, ad) {
    return Ad.findByIdAndUpdate(adId, ad);
};

async function deleteAd(adId) {
    return Ad.findByIdAndDelete(adId);
};

async function apply(adId, userId) {
    const existing = await Ad.findById(adId);
    existing.users.push(userId);
    existing.applied++;

    return existing.save();
};

async function getUsersApplied(adId) {
    const ad = await getById(adId);
    const usersApplied = ad.users;

    const users = [];

    for (const user of usersApplied) {
        const { email, skills } = await getUser(user);

        users.push({ email, skills });
    }
    
    return users;
}

async function getAdsByEmail(email) {
    return await Ad.find({ author: email }).lean();
}

module.exports = {
    getAll,
    getFirstThree,
    getById,
    createAd,
    editAd,
    deleteAd,
    apply,
    getUsersApplied,
    getAdsByEmail
}
