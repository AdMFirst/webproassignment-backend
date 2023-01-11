const verifyToken = require('../middlewares/authJWT');
const isAdmin = require('../middlewares/isAdmin')

module.exports = (app, cors, corsOptions) => {
  const historyTugas = require('../models/historyTugas.models.js');

  const router = require('express').Router();
  router.all('*', cors(corsOptions));

  router.get('/dataHistory', verifyToken, historyTugas.dataHistory);
  
  app.use('/historyTugas', router);
};