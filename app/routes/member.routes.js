const verifyToken = require('../middlewares/authJWT');

module.exports = (app, cors, corsOptions) => {
  const member = require("../models/member.models.js");

  const router = require("express").Router();
  router.all('*', cors(corsOptions));

  router.post("/", verifyToken, member.create);

  router.get("/", verifyToken, member.findAll);

  router.get("/published", member.findAllPublished);

  router.get("/:id", verifyToken, member.findOne);

  router.put("/:id", verifyToken, member.update);

  router.delete("/:id", verifyToken, member.delete);

  router.delete("/", verifyToken, member.deleteAll);

  app.use("/members", router);
};
