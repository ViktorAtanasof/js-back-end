const mongoose = require('mongoose');

const connection = 'mongodb://localhost:27017/tutorials';

module.exports = async (app) => {
    try {
        await mongoose.connect(connection, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log('Database connected!');
        
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}