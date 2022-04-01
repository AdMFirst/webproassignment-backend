module.exports = mongoose => {
    var schema = mongoose.Schema(
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

    const Image = mongoose.model("image", schema);
    return Image;
};
