const themeController = require('../../controller/themes/themes.controller');
const authorizationMiddleware = require('../../middleware/authorization.controller');

module.exports = function(app) {

    app.get("/themes/list",authorizationMiddleware.auth, themeController.listar);
    app.get("/themes",authorizationMiddleware.auth, themeController.consultarPorCodigo);
    app.post("/themes/update",authorizationMiddleware.auth, themeController.actualizar);
    app.delete("/themes/delete/:id",authorizationMiddleware.auth, themeController.eliminar);
}