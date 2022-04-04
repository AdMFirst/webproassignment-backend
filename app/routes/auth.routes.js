const verifyToken = require('../middlewares/authJWT');
const isAdmin = require('../middlewares/isAdmin');

module.exports = (app, cors, corsOptions) => {
    const auth = require("../controllers/auth.controller.js");

    let router = require("express").Router();
    router.all('*', cors(corsOptions));

    router.post("/register", verifyToken, isAdmin, auth.register);

    router.post("/login", auth.login);

    router.get("/me", verifyToken, auth.getUser);

    app.use("/auth", router);
};
