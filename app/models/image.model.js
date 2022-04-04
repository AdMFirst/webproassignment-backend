module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            name: String,
            img:
                {
                    data: Buffer,
                    contentType: String
                }
        }
    );

    return mongoose.model("image", schema);
};
