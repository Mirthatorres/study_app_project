const userController = require('../../controller/users/users.controller');
const authorizationMiddleware = require('../../middleware/authorization');
module.exports = function(app) {

    app.post("/users/login", userController.login);
    app.get("/users/list", authorizationMiddleware.authorization, userController.listar);
    app.get("/users", authorizationMiddleware.authorization, userController.consultarPorCodigo);
    app.post("/users/update", authorizationMiddleware.authorization, userController.actualizar);
    app.delete("/users/delete/:id", authorizationMiddleware.authorization, userController.eliminar);
    app.post("/users/logout", authorizationMiddleware.authorization, userController.logout);
}