module.exports = (app) => {
    const auth = require("../controllers/auth.controller.js");

    let router = require("express").Router();

    router.post("/register", auth.register);

    router.post("/login", auth.login);

    app.use("/auth", router);
};
