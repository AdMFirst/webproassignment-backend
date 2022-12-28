
const Buffer = require('buffer/').Buffer;
const db = require('./schema')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = db.users
const ROLE_USER = 'ROLE_USER'

exports.login = (req, res) => {
  try {
    //console.log(req.body);
    User.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        return res.status(500).send({
          message: err,
          success: false
        })
      }
      if (!user) {
        return res.status(404).send({
          message: 'User Not found.',
          success: false
        })
      }

      // comparing passwords
      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      )
      // checking if password was valid and send response accordingly
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: 'Invalid Password!',
          success: false
        })
      }
      // signing token with user id
      const token = jwt.sign(
        {
          id: user.id
        },
        process.env.API_SECRET,
        {
          expiresIn: 86400
        }
      )

      // responding to client request with user profile success message and  access token .
      user.password = undefined
      user.created = undefined
      user.lastChanged = undefined
      return res.status(200).send({
        user: Buffer.from(JSON.stringify(user)).toString('base64'),
        message: 'Login successfull',
        accessToken: token
      })
    })
  } catch (e) {
    console.log(e)
    return res.status(500).send({
      e
    })
  }
}

exports.register = (req, res) => {
  //console.log(req.body);
  const user = new User({
    fullName: req.body.fullName,
    email: req.body.email,
    role: ROLE_USER,
    password: bcrypt.hashSync(req.body.password, 8)
  })

  user.save((err, user) => {
    if (err) {
      return res.status(400).send({
        message: err,
        success: false
      })
    } else {
      return res.status(200).send({
        message: 'User Registered successfully',
        success: true
      })
    }
  })
}

exports.updateRegistration = (req, res) => {
  const updateTo = {
    fullName: req.body.fullName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    jurusan: req.body.jurusan,
    sekolahAsal: req.body.sekolahAsal,
    lastChanged: Date.now(),
  }

  User.findByIdAndUpdate(req.user.id, updateTo, (err, user) => {
    if (err) {
      return res.status(500).send({
        message: err,
        success: false
      })
    }
    user.password = undefined;
    user.created = undefined
    user.lastChanged = undefined
    return res.status(200).send({
      success: true,
      user: Buffer.from(JSON.stringify(user)).toString('base64')
    })
  })
}

/*
exports.getUser = (req, res) => {
    return res.status(200)
        .send(req.user)
};
*/

exports.jwtValid = (req, res) => {
  return res.status(200).send({ success: true })
}

exports.deleteUser = (req, res) => {
  User.findByIdAndDelete(req.user.id, (err, user) => {
    if (err) {
      return res.status(400).send({
        message: err,
        success: false
      })
    }
    //console.log(`User deleted: ${user}`);
    return res.status(200).send({
      success: true,
      message: `User with id ${user.id} successfuly deleted`
    })
  })
}

exports.uploadProfilePicture = (req, res) => {
  // Make change in to
  User.findByIdAndUpdate(req.user.id, {profilePicture: req.body.profilePicture}, (err, user) => {
    if (err) {
      return res.status(500).send({
        message: err,
        success: false
      })
    }
    user.password = undefined;
    user.created = undefined
    user.lastChanged = undefined
    return res.status(200).send({
      success: true,
      user: Buffer.from(JSON.stringify(user)).toString('base64')
    })
  })
}
