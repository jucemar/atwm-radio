const mongoose = require("mongoose");

const Musica = mongoose.model("Musica");

mongoose.set("useFindAndModify", false);

module.exports = {
  async getAll(req, res) {
    const registros = await Musica.find({}).populate("_autor");
    return res.json(registros);
  },

  async getByID(req, res) {
    const registro = await Musica.findById(req.params.id).populate("_autor");
    return res.json(registro);
  },

  async incluir(req, res) {
    const registro = await Musica.create(req.body);
    return res.json(registro);
  },

  async editar(req, res) {
    const registro = await Musica.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    }).populate("_autor");
    return res.json(registro);
  },

  async excluir(req, res) {
    await Musica.findByIdAndRemove(req.params.id);
    return res.send();
  },

  async score(req, res) {
    const registro = await Musica.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    }).populate("_autor");

    req.io.emit("scoreMusica", registro);

    return res.json(registro);
  }
};
