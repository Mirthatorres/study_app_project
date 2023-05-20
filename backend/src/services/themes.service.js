const { SELECT, INSERT, UPDATE } = require("sequelize");
const { sequelize } = require("../connection");
const { ThemeModel } = require("../model/themes.model");

const listar = async function (textoBuscar) {
  console.log("listar themes service");

  try {
    const themes = await sequelize.query(
      `SELECT * FROM themes 
        WHERE 1=1
          AND name LIKE '%${textoBuscar}%'
      ORDER BY id`
    );

    if (themes) {
      
      return themes[0];

    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const consultarPorCodigo = async function (id) {
  console.log("Buscar theme service");

  try {

    const ThemeModelResult = await ThemeModel.findByPk(id);

    if (ThemeModelResult) {
      
      return ThemeModelResult;
    } else {
      return []
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const actualizar = async function (id, name, create_date, description, keywords, owner_user_id) {
  console.log("actualizar themes service");
  let themeRetorno = null;
  const data = { name, create_date, description, keywords, owner_user_id };
  let tmsExiste = null;
  try {
    if (id) {
      tmsExiste = await ThemeModel.findByPk(id);
    }
    console.log(tmsExiste);
    if (tmsExiste) {
      
      themeRetorno = await ThemeModel.update(data, { where: { id: id } });

    } else {

      themeRetorno = await ThemeModel.create(data);
    }

    return themeRetorno;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const eliminar = async function (id) {
  console.log("eliminar themes service");

  try {
    await ThemeModel.destroy( { where: { id: id } });

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
