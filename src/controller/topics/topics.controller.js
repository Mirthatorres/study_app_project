const { SELECT, INSERT, UPDATE } = require("sequelize");
const { sequelize } = require("../../connection");
const TopicService = require("../../services/topics.service");

const listar = async function (req, res) {
  console.log("listar topics");

  try {
    const topics = await TopicService.listar(req.query.filtro || '');

    if (topics) {
      res.json({
        success: true,
        topics: topics,
      });
    } else {
      res.json({
        success: true,
        topics: [],
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      error: error.message,
    });
  }
};

const consultarPorCodigo = async function (req, res) {
  console.log("Buscar topic");

  try {
    const topic = await TopicService.consultarPorCodigo(req.query.id || '');

    if (topic) {
      res.json({
        success: true,
        topic: topic,
      });
    } else {
      res.json({
        success: true,
        topic: [],
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      error: error.message,
    });
  }
};
const actualizar = async function (req, res) {
  console.log("actualizar topics");

  let topicRetorno = null;
  
  try {
   
    topicRetorno = await TopicService.actualizar(req.body.id, req.body.name, req.body.create_date, req.body.order, req.body.priority, req.body.color, req.body.owner_user_id);

    res.json({
      success: true,
      topic: topicRetorno,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      error: error.message,
    });
  }
};

const eliminar = async function (req, res) {
  console.log("eliminar topics");

  try {

    const topicRetorno = await TopicService.eliminar(req.params.id);

    res.json({
      success: topicRetorno,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  listar,
  actualizar,
  eliminar,
  consultarPorCodigo
};