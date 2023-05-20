const TopicController = require('../../controller/topics/topics.controller');
const authorizationMiddleware = require('../../middleware/authorization.controller');

module.exports = function(app) {

    app.get("/topics/list", authorizationMiddleware.auth, TopicController.listar);
    app.get("/topic/:id", authorizationMiddleware.auth, TopicController.consultarPorCodigo);
    app.post("/topics/update", authorizationMiddleware.auth, TopicController.actualizar);
    app.delete("/topics/delete/:id", authorizationMiddleware.auth, TopicController.eliminar);
}