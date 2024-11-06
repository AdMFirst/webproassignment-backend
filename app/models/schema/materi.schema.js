module.exports = (mongoose) => {
  
    const schema = mongoose.Schema(
        {
          judulMateri: {
            type: String,
            required: true
          },
          jenisMapel: {
            type: String,
            required: true
          },
          video: {
            type: String,
            required: true
          },
          tanggal: {
            type: Date,
            default: Date.now
          }
          // kuis: {
          //   type: mongoose.Types.ObjectID,
          //   ref: 'soal'
          // }
        }
    );
  
    schema.method('toJSON', function() {
      const {__v, _id, ...object} = this.toObject();
      object.id = _id;
      return object;
    });
  
    return mongoose.model('materi', schema);
  };
  