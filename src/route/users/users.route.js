const userController = require('../../controller/users/users.controller');

module.exports = function(app) {

    app.get("/users/list", userController.listar);
    app.get("/users", userController.consultarPorCodigo);
    app.post("/users/update", userController.actualizar);
    app.delete("/users/delete/:id", userController.eliminar);
}