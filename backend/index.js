const express = require("express");
const mongose = require("mongoose");
const cors = require("cors");
const requireDir = require("require-dir");
const bodyParser = require("body-parser");
require("dotenv/config");

mongose.connect(process.env.URL_CONNEXION_MONGODB_ATLAS, {
  useCreateIndex: true,
  useNewUrlParser: true
});

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = require("http").Server(app);
const io = require("socket.io")(server);

//tentativa sem sucesso de conserto do erro socket.io e cors...
io.origins((origin, callback) => {
  if (origin !== "http://localhost:3000") {
    return callback("origin not allowed", false);
  }
  callback(null, true);
});

app.use((req, res, next) => {
  req.io = io;
  return next();
});

requireDir("./src/models");

app.use("/api", require("./src/router"));

app.listen(process.env.PORT || 4000, () => console.log("SERVIDOR RODANDO"));
