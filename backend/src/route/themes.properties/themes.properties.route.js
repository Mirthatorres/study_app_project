const themePropertyController = require('../../controller/themes.properties/themes.properties.controller');
const authorizationMiddleware = require('../../middleware/authorization.controller');

module.exports = function(app) {

    app.get("/themes-properties/list",authorizationMiddleware.auth, themePropertyController.listar);
    app.get("/themes-properties/consulta",authorizationMiddleware.auth, themePropertyController.consulta);
    app.get("/themes-properties",authorizationMiddleware.auth, themePropertyController.consultarPorCodigo);
    app.post("/themes-properties/update",authorizationMiddleware.auth, themePropertyController.actualizar);
    app.delete("/themes-properties/delete/:id",authorizationMiddleware.auth, themePropertyController.eliminar);
}