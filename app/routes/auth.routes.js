module.exports = (app, cors, corsOptions) => {
    const auth = require("../controllers/auth.controller.js");

    let router = require("express").Router();

    router.post("/register", auth.register);

    router.post("/login", cors(corsOptions), auth.login);

    app.use("/auth", router);
};
