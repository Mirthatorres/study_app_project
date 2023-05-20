const userController = require('../../controller/users/users.controller');
const authorizationMiddleware = require('../../middleware/authorization.controller');
module.exports = function(app) {

    app.post("/users/login", userController.login);
    app.get("/users/list", authorizationMiddleware.auth, userController.listar);
    app.get("/user/:id", authorizationMiddleware.auth, userController.consultarPorCodigo);
    app.post("/user/update", authorizationMiddleware.auth, userController.actualizar);
    app.delete("/users/delete/:id", authorizationMiddleware.auth, userController.eliminar);
    app.post("/users/logout", authorizationMiddleware.auth, userController.logout);
}