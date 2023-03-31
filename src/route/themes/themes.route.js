const themeController = require('../../controller/themes/themes.controller');
const authorizationMiddleware = require('../../middleware/authorization');

module.exports = function(app) {

    app.get("/themes/list",authorizationMiddleware.authorization, themeController.listar);
    app.get("/themes",authorizationMiddleware.authorization, themeController.consultarPorCodigo);
    app.post("/themes/update",authorizationMiddleware.authorization, themeController.actualizar);
    app.delete("/themes/delete/:id",authorizationMiddleware.authorization, themeController.eliminar);
}