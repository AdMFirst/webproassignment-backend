const verifyToken = require('../middlewares/authJWT');

module.exports = (app, upload, cors, corsOptions) => {
    const image = require("../controllers/image.controller.js");

    let router = require("express").Router();
    router.all('*', cors(corsOptions));

    router.post("/upload", upload.single("image"), verifyToken, image.upload);

    router.get("/:id", verifyToken, image.findOne);

    router.delete("/:id", verifyToken, image.delete);

    app.use("/images", router);
};
