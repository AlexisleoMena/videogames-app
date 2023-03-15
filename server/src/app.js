const express = require("express");
const cors = require('cors');
const morgan = require("morgan"); 
const routes = require("./routes");
const errorHandler = require("./utils/middlewares/errorHandler");
const setHeaders = require("./utils/middlewares/setHeaders");
require("./db.js");

const app = express();
app.name = "API";
// Middlewares
app.use(cors({ origin: true, credentials: true  }));
app.use(express.urlencoded({extended: true, limit:"50mb"}));  // Analiza solicitudes con cabecera "application/x-www-form-urlencoded" parseando el contenido del req.body con este tipo de contenido especificado a codigo JS.
app.use(express.json({limit:"50mb"})); // Analiza solicitudes con cabecera "Content-Type: application/json" parseando el contenido del req.body con este tipo de contenido especificado a codigo JS.
app.use(morgan("dev")); // Pinta (registra) en consola detalles de cada solicitud HTTP realizada.
app.use(setHeaders);
app.use("/", routes);
app.use(errorHandler)

module.exports = app;