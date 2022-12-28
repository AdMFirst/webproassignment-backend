const verifyToken = require('../middlewares/authJWT');

module.exports = (app, cors, corsOptions) => {
  const auth = require('../models/auth.models.js');

  const router = require('express').Router();
  router.all('*', cors(corsOptions));

  // router.post("/register", verifyToken, isAdmin, auth.register);
  router.post('/register', auth.register);

  router.post('/login', auth.login);

  router.post('/verify', verifyToken, auth.jwtValid);

  router.post('/updateregistration', verifyToken, auth.updateRegistration);

  router.post('/upload', verifyToken, auth.uploadProfilePicture )

  app.use('/auth', router);
};
