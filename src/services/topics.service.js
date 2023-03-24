const { SELECT, INSERT, UPDATE } = require("sequelize");
const { sequelize } = require("../connection");
const { TopicModel } = require("../model/topics.model");

const listar = async function (textoBuscar) {
  console.log("listar topics service");

  try {
    const topics = await sequelize.query(
      `SELECT * FROM topics 
        WHERE 1=1
          AND name LIKE '%${textoBuscar}%'
      ORDER BY id`
    );

    if (topics) {
      
      return topics[0];

    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const consultarPorCodigo = async function (id) {
  console.log("Buscar topic service");

  try {

    const TopicModelResult = await TopicModel.findByPk(id);

    if (TopicModelResult) {
      
      return TopicModelResult;
    } else {
      return []
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const actualizar = async function (id, name, create_date, order, priority, color, owner_user_id) {
  console.log("actualizar topics service");

  let topicRetorno = null;
  const data = { name, create_date, order, priority, color, owner_user_id };

  let tpsExiste = null;
  try {
    if (id) {
      tpsExiste = await TopicModel.findByPk(id);
    }

    if (tpsExiste) {
      
      topicRetorno = await TopicModel.update(data, { where: { id: id } });

    } else {

      topicRetorno = await TopicModel.create(data);
    }

    return topicRetorno;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const eliminar = async function (id) {
  console.log("eliminar topics service");

  try {
    await TopicModel.destroy( { where: { id: id } });

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
