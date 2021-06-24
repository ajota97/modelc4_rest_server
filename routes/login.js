const express = require('express');
const app = express();

var loginController = require('../controllers/login');

//Routes
app.post('/login', loginController.login);
//app.put('/client/:id', loginController.update);







module.exports = app;