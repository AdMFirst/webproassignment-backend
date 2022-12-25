const verifyToken = require('../middlewares/authJWT');
const isAdmin = require('../middlewares/isAdmin');

module.exports = (app, cors, corsOptions) => {
    const auth = require("../models/auth.models.js");

    let router = require("express").Router();
    router.all('*', cors(corsOptions));

    //router.post("/register", verifyToken, isAdmin, auth.register);
    router.get("/protected", verifyToken, (req, res, corsOptions) => {
        res.status(200).send(req.user)
    });

    router.get("/admin", verifyToken, isAdmin,(req, res, corsOptions) => {
        res.status(200).send(req.user)
    });

    router.delete("/remove", verifyToken, auth.deleteUser);

    app.use("/testapi", router);
};