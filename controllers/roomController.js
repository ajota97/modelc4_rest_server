let Room = require('../models/user');
const { response, request } = require('express');

var controller = {

    /***************
    Save a room
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



            userDB.save((err, userResponse) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                }

                res.status(200).json({
                    ok: true,
                    user: userResponse
                });
            });


        }); //endFindById

    }, //End save


    /***************
    Save a project
    ***************/
    saveCoord: (req = request, res = response) => {
        var userId = req.params.userId;
        let body = req.body;
        Room.findById(userId, (err, userDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }


            let saved = {
                name: body.name,
                coord: body.coord,
                link: body.link,
                description: body.description
            };

            userDB.saved.push(saved);

            userDB.save((err, userResponse) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                }

                res.status(200).json({
                    ok: true,
                    user: userResponse
                });
            });


        }); //endFindById
    },
    /***************
    Get saved project
    ***************/
    getSaved: (req = request, res = response) => {
        let from = Number(req.query.from) || 0;
        var _id = req.params.userId;
        Room.findById({ _id })
            .skip(from)
            .limit(5)
            .exec((err, savedDB) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                }

                let saved = savedDB.saved;
                res.json({
                    ok: true,
                    saved
                });
            });



    },
    enterRoom: (req = request, res = response) => {


    }


}


module.exports = controller;