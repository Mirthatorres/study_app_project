const TopicController = require('../../controller/topics/topics.controller');
const authorizationMiddleware = require('../../middleware/authorization');

module.exports = function(app) {

    app.get("/topics/list", authorizationMiddleware.authorization, TopicController.listar);
    app.get("/topics", authorizationMiddleware.authorization, TopicController.consultarPorCodigo);
    app.post("/topics/update", authorizationMiddleware.authorization, TopicController.actualizar);
    app.delete("/topics/delete/:id", authorizationMiddleware.authorization, TopicController.eliminar);
}