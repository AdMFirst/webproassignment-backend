const verifyToken = require('../middlewares/authJWT');
const isAdmin = require('../middlewares/isAdmin')

module.exports = (app, cors, corsOptions) => {
  const contoh = require('../models/contoh.models.js');

  const router = require('express').Router();
  router.all('*', cors(corsOptions));

  // router.post("/register", verifyToken, isAdmin, auth.register);
  router.post('/tambah', verifyToken, contoh.tambah);
  router.get('/ambil', contoh.ambil);
  router.delete('/hapus', verifyToken, isAdmin, contoh.hapus)
  

  app.use('/contoh', router);
};
