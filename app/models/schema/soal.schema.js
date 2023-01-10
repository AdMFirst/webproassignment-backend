const { Schema } = require("mongoose");

module.exports = (mongoose) => {
  
    const schema = mongoose.Schema(
        {
          content:{
            type: [String],
            required:true
          },
          owner:{
            type: Schema.Types.ObjectId,
            ref: "user"
          },
          created: {
            type: Date,
            default: Date.now,
          },
        },
    );
  
    schema.method('toJSON', function() {
      const {__v, _id, ...object} = this.toObject();
      object.id = _id;
      return object;
    });
  
    return mongoose.model('soal', schema);
  };
  