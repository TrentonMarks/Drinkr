const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');

// Create/Post Route
// Route that authenticates the submitted username/password
router.post('/', function(req, res){
    User.findOne({ username: req.body.username }, function(err, foundUser){
        if( bcrypt.compareSync(req.body.password, foundUser.password) ){
            req.session.currentuser = foundUser;
            res.status(201).json({
                status:201,
                message:'session created'
            })
        } else {
            res.status(401).json({
                status:401,
                message:'login failed'
            })
        }
    });
});

// Destroy/Delete Route
// Route that allows user to log out
router.delete('/', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

module.exports = router;
