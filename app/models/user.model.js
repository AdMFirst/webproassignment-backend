module.exports = mongoose => {
    const { ROLE_ADMIN, ROLE_USER } = require("../config/app.config");

    const schema = mongoose.Schema(
        {
            fullName: {
                type: String,
                required: [true, "fullname not provided "],
            },
            email: {
                type: String,
                unique: [true, "email already exists in database!"],
                lowercase: true,
                trim: true,
                required: [true, "email not provided"],
                validate: {
                    validator: function (v) {
                        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
                    },
                    message: '{VALUE} is not a valid email!'
                }

            },
            role: {
                type: String,
                enum: [ROLE_ADMIN, ROLE_USER],
                required: [true, "Please specify user role"]
            },
            password: {
                type: String,
                required: true
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

    return mongoose.model("user", schema);
};
