const { SELECT, INSERT, UPDATE } = require("sequelize");
const { sequelize } = require("../../connection");
const UserService = require("../../services/users.service");

const listar = async function (req, res) {
  console.log("listar usuarios");

  try {
    const users = await UserService.listar(req.query.filtro || '');
    
    if (users) {
      res.json({
        success: true,
        usuarios: users,
      });
    } else {
      res.json({
        success: true,
        usuarios: [],
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
  console.log("Buscar usuario");

  try {

    const UserResult = await UserService.consultarPorCodigo(req.params.id);

    if (UserResult) {
      res.json({
        success: true,
        usuario: UserResult,
      });
    } else {
      res.json({
        success: true,
        usuario: [],
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
  console.log("actualizar usuarios");

  let usuarioRetorno = null;
  try {
    
    usuarioRetorno = await UserService.actualizar(req.body.id, req.body.name, req.body.last_name, req.body.email, req.body.password, req.body.avatar, req.body.deleted);

    res.json({
      success: true,
      user: usuarioRetorno,
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
  console.log("eliminar usuarios");

  try {
    const usuarioRetorno = await UserService.eliminar(req.params.id);

    res.json({
      success: usuarioRetorno,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  console.log("log usuario");
  try {
    
    const user = await UserService.login(req, res);

    if(user){

      res.json({
        success: true,
        token: user
      });
    }else{
      res.json({
        success: false,
        error:'Usuario no encontrado'
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      error: error.message,
    });
  }
}

const logout = async (req, res) => {
  console.log("deslog usuario");
  try {
    
    const user = await UserService.logout(req, res);

    res.json({
      success: true
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      error: error.message,
    });
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
