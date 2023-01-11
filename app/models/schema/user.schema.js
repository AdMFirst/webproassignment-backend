module.exports = (mongoose) => {
  const ROLE_ADMIN = 'ROLE_ADMIN';
  const ROLE_USER = 'ROLE_USER';

  const schema = mongoose.Schema(
      {
        fullName: {
          type: String,
          required: [true, 'Full Name not provide'],
        },
        email: {
          type: String,
          unique: [true, 'Email already exists in database!'],
          lowercase: true,
          trim: true,
          required: [true, 'email not provided'],
          validate: {
            validator: function(v) {
              return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: '{VALUE} is not a valid email!',
          },

        },
        role: {
          type: String,
          enum: [ROLE_ADMIN, ROLE_USER],
          required: [true, 'Please specify user role'],
        },
        password: {
          type: String,
          required: true,
        },
        created: {
          type: Date,
          default: Date.now,
        },
        lastChanged: {
          type: Date,
          default: Date.now
        },
        phoneNumber: {
          type: String,
          required: false
        },
        profilePicture: {
          type: String,
          required: true,
          default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        },
        jurusan: {
          type: String,
          required: false
        },
        sekolahAsal: {
          type: String,
          required: false
        }
        
      }
  );

  schema.method('toJSON', function() {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
  });

  return mongoose.model('user', schema);
};
