const db = require('./schema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = db.users;
const ROLE_USER = 'ROLE_USER';

exports.login = (req, res) => {
  try {
    //console.log(req.body);
    User.findOne({
      email: req.body.email,
    })
        .exec((err, user) => {
          if (err) {
            return res.status(500)
                .send({
                  message: err,
                  success: false,
                });
          }
          if (!user) {
            return res.status(404)
                .send({
                  message: 'User Not found.',
                  success: false,
                });
          }

          // comparing passwords
          const passwordIsValid = bcrypt.compareSync(
              req.body.password,
              user.password,
          );
          // checking if password was valid and send response accordingly
          if (!passwordIsValid) {
            return res.status(401)
                .send({
                  accessToken: null,
                  message: 'Invalid Password!',
                  success: false,
                });
          }
          // signing token with user id
          const token = jwt.sign({
            id: user.id,
          }, process.env.API_SECRET, {
            expiresIn: 86400,
          });

          // responding to client request with user profile success message and  access token .
          return res.status(200)
              .send({
                user: {
                  id: user._id,
                  email: user.email,
                  fullName: user.fullName,
                },
                message: 'Login successfull',
                accessToken: token,
              });
        });
  } catch (e) {
    console.log(e);
    return res.status(500)
        .send({
          e,
        });
  }
};

exports.register = (req, res) => {
  //console.log(req.body);
  const user = new User({
    fullName: req.body.fullName,
    email: req.body.email,
    role: ROLE_USER,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  user.save((err, user) => {
    if (err) {
      return res.status(400)
          .send({
            message: err,
            success: false,
          });
    } else {
      return res.status(200)
          .send({
            message: 'User Registered successfully',
            success: true,
          });
    }
  });
};

/*
exports.getUser = (req, res) => {
    return res.status(200)
        .send(req.user)
};
*/

exports.jwtValid = (req, res) => {
    return res.status(200).send({success: true});
}

exports.deleteUser = (req, res) => {
  User.findByIdAndDelete(req.user.id, (err, user) => {
    if (err) {
      return res.status(400)
          .send({
            message: err,
            success: false,
          });
    }
    //console.log(`User deleted: ${user}`);
    return res.status(200).send({
      success: true,
      message: `User with id ${user.id} successfuly deleted`,
    });
  });
};

