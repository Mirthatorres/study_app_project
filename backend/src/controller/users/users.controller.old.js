const { SELECT, INSERT, UPDATE } = require("sequelize");
const { sequelize } = require("../../connection");

const listar = async function (req, res) {
  console.log("listar usuarios");

  try {
    const users = await sequelize.query(
      "SELECT * FROM users WHERE deleted is FALSE"
    );

    if (users && users[0]) {
      res.json({
        success: true,
        usuarios: users[0],
      });
    } else {
      res.json({
        success: true,
        usuarios: [],
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
  console.log("Buscar usuario");

  const id =  req.params.id;

  try {
    const users = await sequelize.query(
      `SELECT * FROM users WHERE 1=1 AND id = ${id} AND deleted IS FALSE`
    );

    if (users && users[0]) {
      res.json({
        success: true,
        usuario: users[0][0],
      });
    } else {
      res.json({
        success: true,
        usuario: [],
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
  console.log("actualizar usuarios");

  let usuarioRetorno = null;
  const data = req.body;
  const id = req.body.id;

  let usrExiste = null;
  try {
    if (id) {
      usrExiste = await sequelize.query("SELECT * FROM users WHERE id= " + id);
    }

    if (usrExiste && usrExiste[0] && usrExiste[0][0] && usrExiste[0][0].id) {
      const retornoUpdate = await sequelize.query(`UPDATE users SET 
                    name = '${data.name}', 
                    last_name = '${data.last_name}', 
                    avatar = '${data.avatar}', 
                    email = '${data.email}', 
                    password = '${data.password}', 
                    deleted = '${data.deleted} '
                WHERE id = ${id}`);

      usuarioRetorno = await sequelize.query(
        "SELECT * FROM users WHERE id = " + usrExiste[0][0].id
      );

      usuarioRetorno = usuarioRetorno[0][0];
    } else {
      const retornoInsert = await sequelize.query(
        `INSERT INTO users (name, last_name, avatar, email, password, deleted) VALUES ('${data.name}', '${data.last_name}', '${data.avatar}', '${data.email}', '${data.password} ', false) RETURNING id;`
      );

      usuarioRetorno = await sequelize.query(
        "SELECT * FROM users WHERE id = " + retornoInsert[0][0].id
      );
      usuarioRetorno = usuarioRetorno[0][0];
    }

    res.json({
      success: true,
      user: usuarioRetorno,
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
};

const eliminar = async function (req, res) {
  console.log("eliminar usuarios");

  try {
    await sequelize.query(
      "UPDATE users SET deleted = true WHERE id = " + req.params.id
    );

    res.json({
      success: true,
    });
  } catch (error) {
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
