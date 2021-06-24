const { listenerCount } = require('../../models/user');
const { io } = require('../server');



io.on('connection', (socket) => {
    const idHandShake = socket.id;
    const { nameRoom } = socket.handshake.query;


    //Join to room
    socket.on('joinRoom', (data, callback) => {

        if (!data.room) {
            return callback({
                error: true,
                message: 'Room is required!'
            });
        }

        //Uniendo a una sala en particular
        socket.join(data.room);
        console.log(`join to ${data.room}`);
        //client.broadcast.to(data.sala).emit('listaPersona', usuarios.getPersonasPorSala(data.sala));
        //client.broadcast.to(data.sala).emit('crearMensaje', crearMensaje('Admin', `${data.nombre} se unió`));
        // callback(usuarios.getPersonasPorSala(data.sala));
        callback(`Users connected to ${data.room}`);

    });


    socket.on('disconnect', () => {
        console.log(`User ${idHandShake} salió`);

    });


    //Recibe las coordenadas del frontend y los reenvia a los demas users conectados en la misma sala
    socket.on('draw_shape', (room, coord) => {

        //Emit to other the coords
        socket.broadcast.in(room).emit('draw_shape', coord);

    });





});