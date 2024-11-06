const { Schema } = require("mongoose");

module.exports = (mongoose) => {
  
    const schema = mongoose.Schema(
        {
          userId:{
            type: Schema.Types.ObjectId,
            ref: "user"
          },
          accessedAt: {
            type: Date,
            default: Date.now,
          },
          soalId:{
            type: Schema.Types.ObjectId,
            ref: "soal"
          }
        },
    );
  
    schema.method('toJSON', function() {
      const {__v, _id, ...object} = this.toObject();
      object.id = _id;
      return object;
    });
  
    return mongoose.model('historyTugas', schema);
  };