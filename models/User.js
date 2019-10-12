const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    contactNumber: {
        type: Number
    },
    address: {
        type: String
    },
    googleId: {
        type: String
    },
    facebookId: {
        type: String
    },
    picture: {
        type: String
    }
});

module.exports = mongoose.model('User', userSchema);