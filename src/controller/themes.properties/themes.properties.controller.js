const { SELECT, INSERT, UPDATE } = require("sequelize");
const { sequelize } = require("../../connection");
const ThemePropertyService = require("../../services/themes.properties.service");

const listar = async function (req, res) {
  console.log("listar propiedades de los temas");

  try {
    const themes_properties = await ThemePropertyService.listar(req.query.filtro || '');

    if (themes_properties) {
      res.json({
        success: true,
        tema_properties: themes_properties,
      });
    } else {
      res.json({
        success: true,
        tema_properties: [],
      });
    }
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
};
const consulta = async function (req, res) {
  console.log("Buscar propiedades de los temas");

  try {
    const themes_properties = await ThemePropertyService.consulta(req.query.filtro || '');

    if (themes_properties) {
      res.json({
        success: true,
        tema_properties: themes_properties,
      });
    } else {
      res.json({
        success: true,
        tema_properties: [],
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
  console.log("Buscar propiedades de tema");

  try {
    const tema_properties = await ThemePropertyService.consultarPorCodigo(req.query.id || '');;

    if (tema_properties) {
      res.json({
        success: true,
        tema_property: tema_properties,
      });
    } else {
      res.json({
        success: true,
        tema_property: [],
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
  console.log("actualizar propiedades de los temas");

  let temaPropertyRetorno = null;

  try {
    
    temaPropertyRetorno = await ThemePropertyService.actualizar(req.body.id, req.body.theme_id, 
                                                req.body.property_name, req.body.property_value);

    res.json({
      success: true,
      tema_property: temaPropertyRetorno,
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
  console.log("eliminar propiedades de los temas");

  try {
    const themePropertyRetorno = await ThemePropertyService.eliminar(req.params.id);

    res.json({
      success: themePropertyRetorno,
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
  consultarPorCodigo,
  consulta
};
