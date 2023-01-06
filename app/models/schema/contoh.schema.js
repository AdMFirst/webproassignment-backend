module.exports = (mongoose) => {
  
    const schema = mongoose.Schema(
        {
            owner: {
              type: mongoose.Types.ObjectId,
              ref: 'user'
            }, 
            content: {
              type: String,
              required: true
            },
            likes: {
              type: Number,
              default: 0
            },
            created: {
              type: Date,
              default: Date.now,
            },
            lastChanged: {
              type: Date,
              default: Date.now
            },
        },
    );
  
    schema.method('toJSON', function() {
      const {__v, _id, ...object} = this.toObject();
      object.id = _id;
      return object;
    });
  
    return mongoose.model('contoh', schema);
  };
  