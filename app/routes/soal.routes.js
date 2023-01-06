const verifyToken = require('../middlewares/authJWT');
const isAdmin = require('../middlewares/isAdmin')

module.exports = (app, cors, corsOptions) => {
  const soal = require('../models/soal.models.js');

  const router = require('express').Router();
  router.all('*', cors(corsOptions));

  // router.post("/register", verifyToken, isAdmin, auth.register);
  router.post('/tambah', verifyToken, soal.tambah);
  router.get('/dapat', verifyToken, soal.dapat);
  router.delete('/hapus', verifyToken, isAdmin, soal.hapus)
  
  app.use('/soal', router);
};