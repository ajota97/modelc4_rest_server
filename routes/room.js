const express = require('express');
const app = express();
const { verificaToken } = require('../server/middlewares/autentication');

var roomController = require('../controllers/roomController');

//Routes
app.post('/saveroom/:userId', verificaToken, roomController.save);
app.post('/savecoord/:userId', verificaToken, roomController.saveCoord);
app.get('/savecoord/:userId', verificaToken, roomController.getSaved);
//app.put('/client/:id', roomController.update);







module.exports = app;