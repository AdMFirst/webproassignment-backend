module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            fullName: {
                type: String,
                required: [true, "Full Name not provided"],
            },
            position: {
                type: String,
                required: [true, "Position not provided"],
            },
            description: {
                type: String,
                required: [true, "Description not provided"],
            },
            en: {
                fullName: {
                    type: String,
                    required: [true, "Full Name EN not provided"],
                },
                position: {
                    type: String,
                    required: [true, "Position EN not provided"],
                },
                description: {
                    type: String,
                    required: [true, "Description EN not provided"],
                },
            },
            published: Boolean,
            imageId: {
                type: String,
                required: [true, "ImageId not provided"],
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

    return mongoose.model("member", schema);
};
