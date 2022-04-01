const verifyToken = require('../middlewares/authJWT');

module.exports = (app, upload) => {
    const image = require("../controllers/image.controller.js");

    let router = require("express").Router();

    router.post("/upload", upload.single("image"), verifyToken, image.upload);

    router.get("/:id", verifyToken, image.findOne);

    router.delete("/:id", verifyToken, image.delete);

    app.use("/images", router);
};
