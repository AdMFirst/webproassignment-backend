module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      title: String,
      description: String,
      published: Boolean,
      imageId: String
    }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  return mongoose.model("post", schema);
};
