const verifyToken = require('../middlewares/authJWT');
const isAdmin = require('../middlewares/isAdmin')

module.exports = (app, cors, corsOptions) => {
  const materi = require('../models/materi.models.js');
  const router = require('express').Router();

  router.get('/explore', materi.exploreVideo);
  router.post('/create', verifyToken, isAdmin, materi.createVideo);
  //router.get('/read/:id', materi.readVideo);
  router.get('/read', materi.readVideo);
  //router.put('/update/:id', materi.updateVideo);
  router.put('/update', materi.updateVideo);
  //router.delete('/delete/:id', verifyToken, isAdmin, materi.deleteVideo);
  router.delete('/delete', verifyToken, isAdmin, materi.deleteVideo);

  app.use('/materi', router);
};
