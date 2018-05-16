const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');
const methodOverride = require('method-override');

// Create/Post Route
// Route that allows user to a profile
router.post('/', function(req, res){
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    User.create(req.body, function(err, createdUser){
        res.status(201).json({
            status:201,
            message: "user created"
        })
    });
});

// Destroy/Delete Route
// Allows user to delete account, automatically logs user out of session
router.delete('/', (req, res,) => {
    User.findOneAndRemove(req.session.currentUser, (err, deleted) => {
        req.session.destroy(()=>{
            res.redirect('/');
        });
    });
});

// Edit/Get Route
// Allows user to edit their username
router.get('/:id/edit', (req, res) => {
    User.find(req.session.currentUser, (err, foundUser) => {
        res.render('users/edit.ejs', {
            foundUser: foundUser
        });
    });
});

// Update/Put Route
// Allows user to edit their username
router.put('/', (req, res) => {
    User.findOneAndUpdate(
        req.session.currentUser.username,
        req.body,
        {new: true},
        (err, updatedModel) => {
            res.redirect('/');
        });
    });

module.exports = router;
