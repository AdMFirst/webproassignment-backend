const db = require('./schema')
const materi = db.materi

exports.exploreVideo = (req, res) => {
  const { jenisMapel } = req.body;
  materi.find({ jenisMapel }, 'id judulMateri', (error, materis) => {
      if (error) {
        return res.status(500).send(error);
      }
      return res.send(materis);
  });
};
  
exports.createVideo = (req, res) => {
  const { judulMateri, jenisMapel, video } = req.body;
  const newVideo = new materi({ judulMateri, jenisMapel, video });
  newVideo.save((error, materi) => {
    if (error) {
      return res.status(500).send(error);
    }
    return res.send(materi);
  });
};

exports.readVideo = (req, res) => {
    const { id } = req.params;
    materi.findById(id, (error, materi) => {
      if (error) {
        return res.status(500).send(error);
      }
      if (!materi) {
        return res.status(404).send('Video not found.');
      }
      return res.send(materi);
    });
  };
  
exports.updateVideo = (req, res) => {
  const updates = req.body;
  materi.findByIdAndUpdate(id, updates, { new: true }, (error, materi) => {
    if (error) {
      return res.status(500).send(error);
    }
    if (!materi) {
      return res.status(404).send('Video not found.');
    }
    return res.send(materi);
  });
};

exports.deleteVideo = (req, res) => {
  materi.findByIdAndRemove(id, (error, materi) => {
    if (error) {
      return res.status(500).send(error);
    }
    if (!materi) {
      return res.status(404).send('Video not found.');
    }
    return res.send(materi);
  });
};
