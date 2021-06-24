const express = require('express');
const app = express();

var userController = require('../controllers/userController');

//Routes
app.post('/register', userController.create);
//app.put('/client/:id', userController.update);







module.exports = app;