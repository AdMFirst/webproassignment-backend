const verifyToken = require('../middlewares/authJWT');
const isAdmin = require('../middlewares/isAdmin')

module.exports = (app, cors, corsOptions) => {
  const soal = require('../models/soal.models.js');

  const router = require('express').Router();
  router.all('*', cors(corsOptions));

  router.post('/tambah', verifyToken, isAdmin, soal.tambah);
  router.get('/dapat', verifyToken, soal.dapat);
  router.delete('/hapus', verifyToken, isAdmin, soal.hapus)
  router.get('/dapat1/:id', verifyToken, soal.getA)
  
  app.use('/soal', router);
};