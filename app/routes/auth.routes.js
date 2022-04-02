module.exports = (app, cors, corsOptions) => {
    const auth = require("../controllers/auth.controller.js");
    const allowCors = require("../middlewares/allowCors");

    let router = require("express").Router();

    router.post("/register", auth.register);

    router.post("/login", allowCors, auth.login);

    app.use("/auth", router);
};
