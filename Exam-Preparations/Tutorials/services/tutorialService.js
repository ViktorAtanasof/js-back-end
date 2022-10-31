const Course = require("../models/Course");

async function getAllByDate(search) {
    const query = {};
    if(search) {
        query.title = new RegExp(search, 'i');
    } 
    return Course.find(query).sort({ date: 1 }).lean();
}

async function getAllRecent() {
    return Course.find({}).sort({ enrolledCount: -1 }).limit(3).lean();
}

async function getbyId(id) {
    return Course.findById(id).lean();
}

async function create(tutorial) {
    return Course.create(tutorial);
}

async function edit(id, tutorial) {
    const existing = await Course.findById(id);

    existing.title = tutorial.title;
    existing.description = tutorial.description;
    existing.imageUrl = tutorial.imageUrl;
    existing.duration = tutorial.duration;

    return existing.save();
}

async function deleteById(id) {
    return Course.findByIdAndDelete(id);
}

async function enroll(tutorialId, userId) {
    const existing = await Course.findById(tutorialId);
    existing.enrolled.push(userId);
    existing.enrolledCount++;
    return existing.save();
}

module.exports = {
    getAllByDate,
    getAllRecent,
    getbyId,
    create,
    edit,
    deleteById,
    enroll
}
