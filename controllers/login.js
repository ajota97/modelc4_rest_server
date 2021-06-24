const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let User = require('../models/user');
const { response, request } = require('express');

var controller = {
    login: (req = request, res = response) => {

            let body = req.body;

            User.findOne({ email: body.email }, (err, userDB) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                }

                if (!userDB || userDB.status == false) {
                    return res.status(400).json({
                        ok: false,
                        err: {
                            message: 'invalid user or password'
                        }
                    });
                }

                if (!bcrypt.compareSync(body.password, userDB.password)) {
                    return res.status(400).json({
                        ok: false,
                        err: {
                            message: 'invalid user or password'
                        }
                    });
                }

                let token = jwt.sign({
                    user: userDB
                }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

                res.json({
                    ok: true,
                    user: userDB,
                    token
                });


            });

        } //End login

}
module.exports = controller;