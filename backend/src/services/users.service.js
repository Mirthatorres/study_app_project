const { SELECT, INSERT, UPDATE } = require("sequelize");
const { sequelize } = require("../connection");
const jwt = require('jsonwebtoken');
const { UserModel } = require("../model/user.model");

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
      data.deleted = 0;
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

const login = async (req, res) => {
  console.log("login de usuarios service");

  try {
  
    //validar usuario
    let userResult = await sequelize.query(
      `SELECT * FROM users 
        WHERE 1=1
          AND deleted is FALSE
          AND email = :n
          AND password = :p LIMIT 1`, {
        replacements: {
          n: req.body.email,
          p: req.body.password
        }
      }
    );
    let user = null;

    if(userResult.length > 0 && userResult[0].length > 0){
      user = userResult[0][0];
      
      if(user.token){
        
        return user.token;
      }

      const payload = {
        id: userResult[0][0].id,
        name: userResult[0][0].name,
        last_name: userResult[0][0].last_name,
        email: userResult[0][0].email
      }
      
      // generar token
      var token = jwt.sign(payload, 'password');

      //guardar token
      await UserModel.update( { token: token }, { where: { id: payload.id } });
      return token;
      
    }else{
      return;
    }

  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      error: error.message
    });
  }
}

const logout = async (req, res) => {

  console.log("cerrar sesion service", res.locals.userId);

  try {
    
    //borrar token
    await UserModel.update( { token: null }, { where: { id: res.locals.userId } });
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
