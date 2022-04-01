

module.exports = (app, upload) => {
    const image = require("../controllers/image.controller.js");

    let router = require("express").Router();

    router.post("/upload", upload.single("image"), image.upload);
    router.get("/:id", image.findOne);

    app.use("/api/images", router);
};
