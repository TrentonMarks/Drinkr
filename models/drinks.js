// Dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema for Drinks
const drinksSchema = Schema({
    name: String,
    glass: String,
    ingredients: String,
    instructions: String,
    image: String,
    likes: {type: Number, default: 0}
});

const Drinks = mongoose.model('Drinks', drinksSchema);

module.exports = Drinks;
