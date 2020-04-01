const mongoose = require("mongoose");

const MusicaSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true },
    album: String,
    score: { type: Number, required: true, default: 0 },
    _autor: { ref: "Autor", type: mongoose.Schema.Types.ObjectId }
  },
  {
    timestamps: true
  }
);

mongoose.model("Musica", MusicaSchema);
