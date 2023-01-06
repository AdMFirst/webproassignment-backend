const db = require('./schema')
const Contoh = db.contoh

exports.tambah = (req, res) => {
  const data = new Contoh({
    owner: req.user.id,
    content: req.body.content
  })

  data.save((err, user) => {
    if (err) {
      return res.status(400).send({
        message: err
      })
    } else {
      return res.status(200).send({
        message: 'added'
      })
    }
  })
}

exports.ambil = (req, res) => {
  // Get the page number from the request query
  const page = parseInt(req.query.page) || 1;

  // Get the number of documents to skip
  const skip = (page - 1) * 10;

  // Find the contoh documents and populate the owner field
  Contoh.find().skip(skip).limit(10).sort({ created: -1 }).populate({
    path: 'owner',
    select: { 
      password: 0, 
      _id: 0, 
      email:0, 
      created:0, 
      lastChanged: 0, 
      __v: 0
    },
  }).exec((err, data) => {
    if (err) {
      return res.status(400).send({
        message: err
      })
    } else {
      return res.status(200).send(data);
    }
  });
};


exports.hapus = (req, res) => {
  // Find the contoh document and delete it
  Contoh.findByIdAndDelete(req.body.id, (err, data) => {
    if (err) {
      return res.status(400).send({
        message: err
      });
    } else {
      return res.status(200).send({
        message: 'deleted'
      });
    }
  });
};

exports.ubah = (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  updates.lastChanged = Date.now();

  //console.log(updates)
  Contoh.findByIdAndUpdate(id, updates, (err, result) => {
    if (err) {
      return res.status(400).send({
        message: err
      })
    } else {
      return res.status(200).send({message: "ok", data: result});
    }
  })
}

exports.like = async (req, res) => {
  try {
    const { id } = req.params;
    const contoh = await Contoh.findById(id);
    contoh.likes++;
    await contoh.save();
    res.send(contoh);
    
  } catch (error) {
    res.status(400).send(error);
  }
};


