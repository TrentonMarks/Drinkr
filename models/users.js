// Dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema for Users
const userSchema = Schema ({
    username: String,
    password: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
