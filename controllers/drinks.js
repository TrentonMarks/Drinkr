// Dependencies
const express = require('express')
const router = express.Router();
const Drinks = require('../models/drinks.js')

// Index/Get Route
router.get('/', (req,res)=>{
    Drinks.find({}, (err, founddrinks)=>{
        res.json(founddrinks);
    });
});

// Create/Post Route
router.post('/', (req,res)=>{
    Drinks.create(req.body, (err, createdDrinks)=>{
        res.json(createdDrinks);
    });
});

// Destroy/Delete Route
router.delete('/:id', (req,res)=>{
    Drinks.findByIdAndRemove(req.params.id,(err, deletedDrinks)=>{
        res.json(deletedDrinks);
    });
});

// Update/Put Route
router.put('/:id', (req,res)=>{
    Drinks.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedDrink)=>{
        res.json(updatedDrink);
    });
});

module.exports = router;
