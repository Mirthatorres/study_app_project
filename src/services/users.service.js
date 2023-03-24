const { SELECT, INSERT, UPDATE } = require("sequelize");
const { sequelize } = require("../connection");
const { UserModel } = require("../model/user.model");

const listar = async function (textoBuscar) {
  console.log("listar usuarios service");

  try {
    const users = await sequelize.query(
      `SELECT * FROM users 
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

    const UserModelResult = await UserModel.findByPk(id);

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
      usrExiste = await UserModel.findByPk(id);
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

module.exports = {
  listar,
  actualizar,
  eliminar,
  consultarPorCodigo
};
