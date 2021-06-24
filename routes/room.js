const express = require('express');
const app = express();
const { verificaToken } = require('../server/middlewares/autentication');

var roomController = require('../controllers/roomController');

//Routes
app.post('/saveroom/:userId', verificaToken, roomController.save);
//app.put('/client/:id', roomController.update);







module.exports = app;