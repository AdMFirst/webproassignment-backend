module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            name: String,
            img:
                {
                    data: Buffer,
                    contentType: String
                },
            size: Number
        }
    );

    return mongoose.model("image", schema);
};
