module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            name: String,
            desc: String,
            img:
                {
                    data: Buffer,
                    contentType: String
                }
        }
    );

    return mongoose.model("image", schema);
};
