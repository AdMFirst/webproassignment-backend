const verifyToken = require('../middlewares/authJWT');

module.exports = (app, cors, corsOptions) => {
  const translate = require("../controllers/translate.controller.js");

  const router = require("express").Router();
  router.all('*', cors(corsOptions));

  router.post("/", verifyToken, translate.translate);

  app.use("/translate", router);
};
