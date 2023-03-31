const { SELECT, INSERT, UPDATE } = require("sequelize");
const { sequelize } = require("../connection");
const { UserModel } = require("../model/user.model");
const jwt = require('jsonwebtoken');

const listar = async function (textoBuscar) {
  console.log("listar usuarios service");

  try {
    const users = await sequelize.query(
      `SELECT id, name, last_name, email, avatar, deleted FROM users 
        WHERE 1=1
          AND deleted is FALSE
          AND name LIKE '%${textoBuscar}%'
      ORDER BY id`
    );

    if (users) {
      
      return users[0];

    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const consultarPorCodigo = async function (id) {
  console.log("Buscar usuario codigo service");

  try {

    const UserModelResult = await UserModel.findByPk(id, { attributes: { exclude: ['password', 'token'] } });

    if (UserModelResult) {
      
      return UserModelResult;
    } else {
      return []
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const actualizar = async function (id, name, last_name, email, password, avatar, deleted) {
  
  console.log("actualizar usuarios service");
  let usuarioRetorno = null;
  const data = { name, last_name, email, password, avatar, deleted };

  let usrExiste = null;
  try {
    if (id) {
      usrExiste = await UserModel.findByPk(id, { attributes: { exclude: ['password', 'token'] } });
    }

    if (usrExiste) {
      
      usuarioRetorno = await UserModel.update(data, { where: { id: id } });

    } else {

      usuarioRetorno = await UserModel.create(data);
    }

    return usuarioRetorno;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const eliminar = async function (id) {
  console.log("eliminar usuarios service");

  try {
    await UserModel.update( { deleted: true }, { where: { id: id } });

    return true;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const login = async (data) => {
  console.log("login de usuarios service");

  try {
  
    //validar usuario
    let userResult = await sequelize.query(
      `SELECT id, name, token FROM users 
        WHERE 1=1
          AND deleted is FALSE
          AND name = :n
          AND password = :p LIMIT 1`, {
        replacements: {
          n: data.username,
          p: data.password
        }
      }
    );
    
    if(userResult[0] && userResult[0].length > 0){
      
      if(userResult[0][0].token && userResult[0][0].token !=''){
      
        return {
          token: userResult[0][0].token
        }
      }else {
        const payload = {
          username: data.username,
          id: userResult[0][0].id
        }
        
        // generar token
        var token = jwt.sign(payload, '12355448');

        //guardar token
        await UserModel.update( { token: token }, { where: { id: payload.id } });
      }
    }else{
      throw new Error("Datos invalidos");
    }

    return {
      token
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const logout = async (usuarioID) => {

  console.log("cerrar sesion service", usuarioID);

  try {
    
    //borrar token
    await UserModel.update( { token: null }, { where: { id: usuarioID } });
    return;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = {
  listar,
  actualizar,
  eliminar,
  consultarPorCodigo,
  login,
  logout
};
