const db = require('./schema')
const Soal = db.soal

//create, read, update, delete
exports.tambah = (req, res) => {
    const data = new Soal({
        owner: req.user.id,
        content: req.body.content
    })
    data.save((err, user) => {
        if (err){
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

exports.dapat = (req, res) => {
    //get the page number from the request query
    const page = parseInt(req.query.page) || 1;
    //Get the number of documents to skip
    const skip = (page - 1) * 10;
    //find the contoh document and populate the owner field
    Soal.find().skip(skip).limit(10).sort({created: -1}).populate({
        path: 'owner',
        select: {
            password: 0,
            _id: 0,
            email: 0,
            created: 0,
            __v: 0
        }
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
    //Find the contoh document and delete it
    Soal.findByIdAndDelete(req.body.id, (err, data) => {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            return res.status(200).send({
                message: 'delete'
            });
        }
    });
}