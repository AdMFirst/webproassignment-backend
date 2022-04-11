const verifyToken = require('../middlewares/authJWT');

module.exports = (app, upload, cors, corsOptions) => {
    const video = require("../controllers/video.controller.js");

    let router = require("express").Router();
    router.all('*', cors(corsOptions));

    router.get("/", video.findAll);

    router.post("/upload", upload.single("video"), verifyToken, video.upload);

    router.get("/:id", video.findOne);

    router.delete("/:id", verifyToken, video.delete);

    app.use("/videos", router);
};
