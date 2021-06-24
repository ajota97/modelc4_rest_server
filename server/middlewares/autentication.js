const jwt = require('jsonwebtoken');


//Verificar token
let verificaToken = (req, res, next) => {
    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err
            });
        }

        req.user = decoded.user;


        next();
    });

}; //End verificar token


module.exports = {
    verificaToken
}