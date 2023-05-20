const { SELECT, INSERT, UPDATE } = require("sequelize");
const { sequelize } = require("../connection");
const jwt = require('jsonwebtoken');

const authorization = async (request, response, next) => {
    
    if(!request.headers.authorization){
        request.json({success: false, error: 'No autorization header'});
        return;
    }else{

        let token = request.headers.authorization;
        const userDB = await sequelize.query(`SELECT id, token FROM users WHERE token = :t`, { replacements: { t: token}});
        let user = null;

        //verificar token
        if(userDB.lenght > 0 && userDB[0].lenght > 0){
            user = userDB[0][0];
            
            request.locals.userId = user.id;
            
            next();
            
        }else{
            response.send({
                success: false,
                error: "Token inválido"
            });
        }
    }
}

module.exports = {
    authorization
}