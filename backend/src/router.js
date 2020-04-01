const express = require("express");
const routes = express.Router();

const AutorController = require("./controllers/AutorController");

routes.get("/autor", AutorController.getAll);
routes.get("/autor/:id", AutorController.getByID);
routes.post("/autor", AutorController.incluir);
routes.put("/autor/:id", AutorController.editar);
routes.delete("/autor/:id", AutorController.excluir);

const MusicaController = require("./controllers/MusicaController");

routes.get("/musica", MusicaController.getAll);
routes.get("/musica/:id", MusicaController.getByID);
routes.post("/musica", MusicaController.incluir);
routes.put("/musica/score/:id", MusicaController.score);
routes.put("/musica/:id", MusicaController.editar);
routes.delete("/musica/:id", MusicaController.excluir);

module.exports = routes;
