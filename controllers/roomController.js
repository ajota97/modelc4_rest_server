let Room = require('../models/user');
const { response, request } = require('express');

var controller = {

    /***************
    Create room
    ***************/
    save: (req = request, res = response) => {
            var userId = req.params.userId;
            const { name, link } = req.body;
            Room.findById(userId, (err, userDB) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                }

                if (!userDB || userDB.status == false) {
                    return res.status(400).json({
                        ok: false,
                        message: 'User does not exist'
                    });
                }

                let room = {
                    name: name,
                    link: link,
                };

                userDB.room.push(room);

                userDB.save((err, userResponse) => {
                    if (err) {
                        return res.status(500).json({
                            ok: false,
                            err
                        });
                    }

                    res.status(500).json({
                        ok: true,
                        user: userResponse
                    });
                });


            }); //endFindById

        } //End save


}
module.exports = controller;