const bcrypt = require('bcrypt');
//const _ = require('underscore');
let User = require('../models/user');
const { response } = require('express');

var controller = {
    /***************
    Create user
    ***************/
    create: (req, res = response) => {
        //Pick up data from body 

        const { fullname, email, password } = req.body;

        //Create and fill the client
        let user = new User({
            fullname,
            email,
            password
        });

        user.password = bcrypt.hashSync(password, 10);
        //Save client to the DB
        user.save((err, userDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }


            res.json({
                ok: true,
                user: userDB
            });

        }); //end save

    }, //End createclient


    /***************
    Update client
    ***************/
    /*update: (req, res) => {

        let id = req.params.id;

        let body = _.pick(req.body, ['name', 'email', 'phone']);

        Client.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, clientDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: 'true',
                client: clientDB
            });

        }); //End findAndUpdate

    }, //Close update
*/

};
module.exports = controller;