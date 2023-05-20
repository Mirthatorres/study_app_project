const { SELECT, INSERT, UPDATE } = require("sequelize");
const { sequelize } = require("../../connection");
const ThemeService = require("../../services/themes.service");

const listar = async function (req, res) {
  console.log("listar temas");

  try {
    const themes = await ThemeService.listar(req.query.filtro || '');

    if (themes) {
      res.json({
        success: true,
        temas: themes,
      });
    } else {
      res.json({
        success: true,
        temas: [],
      });
    }
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
};

const consultarPorCodigo = async function (req, res) {
  console.log("Buscar tema");

  try {
    const tema = await ThemeService.consultarPorCodigo(req.query.id || '');;

    if (tema) {
      res.json({
        success: true,
        tema: tema,
      });
    } else {
      res.json({
        success: true,
        tema: [],
      });
    }
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
};
const actualizar = async function (req, res) {
  console.log("actualizar temas");

  let temaRetorno = null;

  try {
    
    temaRetorno = await ThemeService.actualizar(req.body.id, req.body.name, req.body.create_date, req.body.description, req.body.keywords, req.body.owner_user_id);

    res.json({
      success: true,
      tema: temaRetorno,
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
  console.log("eliminar temas");

  try {

    const themeRetorno = await ThemeService.eliminar(req.params.id);

    res.json({
      success: themeRetorno,
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
