const express = require("express");
const app = express();
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const whatsappclient = require("./helpers/whatsapp-client");
const whatsappRoutes = require("./routes/whatsapp.route");

require("dotenv").config();

whatsappclient.config();

app.set("view engine", "pug");
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("./public"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use((req, res, next) => {
  req.whatsappclient = global.whatsappclient;
  next();
});
app.use("/api/v1", whatsappRoutes);

app.all("*", async (req, res) => {
  return res.status(404).json({
    success: false,
    error: "Resource not found",
  });
});

module.exports = app;
