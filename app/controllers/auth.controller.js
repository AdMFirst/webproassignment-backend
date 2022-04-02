const db = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = db.users;

exports.login = (req, res) => {
    try {
        User.findOne({
            email: req.body.email
        })
            .exec((err, user) => {
                if (err) {
                    return res.status(500)
                        .send({
                            message: err
                        });
                }
                if (!user) {
                    return res.status(404)
                        .send({
                            message: "User Not found."
                        });
                }

                //comparing passwords
                const passwordIsValid = bcrypt.compareSync(
                    req.body.password,
                    user.password
                );
                // checking if password was valid and send response accordingly
                if (!passwordIsValid) {
                    return res.status(401)
                        .send({
                            accessToken: null,
                            message: "Invalid Password!"
                        });
                }
                //signing token with user id
                const token = jwt.sign({
                    id: user.id
                }, process.env.API_SECRET, {
                    expiresIn: 86400
                });

                //responding to client request with user profile success message and  access token .
                return res.status(200)
                    .send({
                        user: {
                            id: user._id,
                            email: user.email,
                            fullName: user.fullName,
                        },
                        message: "Login successfull",
                        accessToken: token,
                    });
            });
    } catch (e) {
        return res.status(500)
            .send({
                e
            });
    }
};

exports.register = (req, res) => {
    const user = new User({
        fullName: req.body.fullName,
        email: req.body.email,
        role: req.body.role,
        password: bcrypt.hashSync(req.body.password, 8)
    });

    user.save((err, user) => {
        if (err) {
            return res.status(500)
                .send({
                    message: err
                });
        } else {
            return res.status(200)
                .send({
                    message: "User Registered successfully"
                })
        }
    });
};
