if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// config/connectToDb.js
const mongoose = require('mongoose');

async function connectToDb() {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to database');
    } catch (err) {
        console.log('Database connection error:', err);
    }
}

module.exports = connectToDb;
