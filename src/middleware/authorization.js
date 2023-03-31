const { SELECT, INSERT, UPDATE } = require("sequelize");
const { sequelize } = require("../connection");
const jwt = require('jsonwebtoken');

const authorization = async (request, response, next) => {
    
    const token = request.headers['authorization'];

    let user = await sequelize.query(`SELECT id, token FROM users WHERE token = :t`, { replacements: { t: token}});

    user = (user && user[0]) ? user[0] : [];

    //verificar token
    if(user.length > 0){
        var decoded_token = jwt.verify(token, '12355448');
        var decoded_user = jwt.verify(user[0].token, '12355448');
        
        if(decoded_token = decoded_user){
            request.usuarioID = user[0].id;
            next();
        }
    }else{
        response.send({
            success: false,
            error: "No se pudo autenticar"
        })
    }
}

module.exports = {
    authorization
}