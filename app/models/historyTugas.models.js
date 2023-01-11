const db = require('./schema')
const historyTugas = db.historyTugas
 
exports.dataHistory = (req, res) => {
    // Get the page number from the request query
    const page = parseInt(req.query.page) || 1;
  
    // Get the number of documents to skip
    const skip = (page - 1) * 10;
  
    // Find the contoh documents and populate the owner field
    historyTugas.find().skip(skip).limit(10).sort({ accessedAt: -1 }).populate({
      path: 'soalId',
      select: { 
        _id: 1, 
        created:1, 
        __v: 0,
        owner:0,
        content:0
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