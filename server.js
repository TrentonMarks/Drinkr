// Dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const methodOverride = require('method-override');

// Middleware
app.use(session({
  secret: "feedmeseymour",
  resave: false,
  saveUninitialized: false
}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'))

// Controllers
const drinksController = require('./controllers/drinks.js');
app.use('/drinks', drinksController);
// const usersController = require('./controllers/users.js');
// app.use('/users', usersController);
// const sessionsController = require('./controllers/sessions.js');
// app.use('/sessions', sessionsController)

// Mongoose Connection
mongoose.connect('mongodb://localhost:27017/drinkr');
mongoose.connection.once('open', () => {
    console.log('connected to mongo');
});

// Configuration and Listener
app.listen(port, () => {
  console.log('Go ahead user, Im listening on port: ');
});
