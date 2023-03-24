const TopicController = require('../../controller/topics/topics.controller');

module.exports = function(app) {

    app.get("/topics/list", TopicController.listar);
    app.get("/topics", TopicController.consultarPorCodigo);
    app.post("/topics/update", TopicController.actualizar);
    app.delete("/topics/delete/:id", TopicController.eliminar);
}