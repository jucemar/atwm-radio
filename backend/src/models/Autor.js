const mongoose = require("mongoose");

const AutorSchema = new mongoose.Schema(
  {
    nome: String
  },
  {
    timestamps: true
  }
);

mongoose.model("Autor", AutorSchema);
