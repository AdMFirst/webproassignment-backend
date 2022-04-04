module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            title: {
                type: String,
                required: [true, "Title not provided"],
            },
            description: {
                type: String,
                required: [true, "Description not provided"],
            },
            published: Boolean,
            imageId: {
                type: String,
                required: [true, "ImageId not provided"],
            },
            userId: {
                type: String,
                required: [true, "UserId not provided"],
            },
            created: {
                type: Date,
                default: Date.now
            }
        }
    );

    schema.method("toJSON", function () {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("post", schema);
};
