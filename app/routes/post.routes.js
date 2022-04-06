const verifyToken = require('../middlewares/authJWT');

module.exports = (app, cors, corsOptions) => {
  const post = require("../controllers/post.controller.js");

  const router = require("express").Router();
  router.all('*', cors(corsOptions));

  router.post("/", verifyToken, post.create);

  router.get("/translate", post.translate);

  router.get("/", verifyToken, post.findAll);

  router.get("/published", post.findAllPublished);

  router.get("/:id", verifyToken, post.findOne);

  router.put("/:id", verifyToken, post.update);

  router.delete("/:id", verifyToken, post.delete);

  router.delete("/", verifyToken, post.deleteAll);

  app.use("/posts", router);
};
