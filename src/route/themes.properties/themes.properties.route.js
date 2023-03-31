const themePropertyController = require('../../controller/themes.properties/themes.properties.controller');
const authorizationMiddleware = require('../../middleware/authorization');

module.exports = function(app) {

    app.get("/themes-properties/list",authorizationMiddleware.authorization, themePropertyController.listar);
    app.get("/themes-properties/consulta",authorizationMiddleware.authorization, themePropertyController.consulta);
    app.get("/themes-properties",authorizationMiddleware.authorization, themePropertyController.consultarPorCodigo);
    app.post("/themes-properties/update",authorizationMiddleware.authorization, themePropertyController.actualizar);
    app.delete("/themes-properties/delete/:id",authorizationMiddleware.authorization, themePropertyController.eliminar);
}