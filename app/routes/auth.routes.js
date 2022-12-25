const verifyToken = require('../middlewares/authJWT');

module.exports = (app, cors, corsOptions) => {
    const auth = require("../models/auth.models.js");

    let router = require("express").Router();
    router.all('*', cors(corsOptions));

    //router.post("/register", verifyToken, isAdmin, auth.register);
    router.post("/register", auth.register);

    router.post("/login", auth.login);

    app.use("/auth", router);
};
