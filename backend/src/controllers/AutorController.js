const mongoose = require("mongoose");

const Autor = mongoose.model("Autor");

mongoose.set("useFindAndModify", false);

module.exports = {
  async getAll(req, res) {
    const registros = await Autor.find({});
    return res.json(registros);
  },

  async getByID(req, res) {
    const registro = await Autor.findById(req.params.id);
    return res.json(registro);
  },

  async incluir(req, res) {
    const registro = await Autor.create(req.body);
    return res.json(registro);
  },

  async editar(req, res) {
    const registro = await Autor.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    return res.json(registro);
  },

  async excluir(req, res) {
    await Autor.findByIdAndRemove(req.params.id);
    return res.send();
  }
};
