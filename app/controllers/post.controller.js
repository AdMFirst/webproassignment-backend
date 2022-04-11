const db = require("../models");
const Post = db.posts;
const Video = db.videos;

// Create and Save a new Post
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Post
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
    titleEN: req.body.titleEN,
    descriptionEN: req.body.descriptionEN,
    published: req.body.published || false,
    created: req.body.created,
    imageId: req.body.imageId,
    videoId: req.body.videoId,
    userId: req.user.id
  });

  // Save Post in the database
  post
    .save(post)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Post."
      });
    });
};

// Retrieve all Posts from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  const condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Post.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving posts."
      });
    });
};

// Find a single Post with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Post.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Post with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Post with id=" + id });
    });
};

// Update a Post by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Post.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Post with id=${id}. Maybe Post was not found!`
        });
      } else res.send({ message: "Post was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Post with id=" + id
      });
    });
};

// Delete a Post with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Post.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Post with id=${id}. Maybe Post was not found!`
        });
      } else {
        res.send({
          message: "Post was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Post with id=" + id
      });
    });
};

// Delete all Posts from the database.
exports.deleteAll = (req, res) => {
  Post.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Post were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all posts."
      });
    });
};

// Find all published Posts
exports.findAllPublished = (req, res) => {
  Post.find({ published: true }).sort({created: -1})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving posts."
      });
    });
};

// Find all published Posts
exports.translate = async (req, res) => {
  if (!req.body.text) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  try {
    const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const languageTranslator = new LanguageTranslatorV3({
      version: process.env.TRANSLATOR_VERSION,
      authenticator: new IamAuthenticator({
        apikey: process.env.TRANSLATOR_API_KEY,
      }),
      serviceUrl: process.env.TRANSLATOR_URL,
      disableSslVerification: true,
    });

    const translateParams = {
      modelId: 'uk-en',
      text: req.body.text,
    };

    languageTranslator.translate(translateParams)
        .then(data => {
          res.status(200).send(data.result.translations.map(t => t.translation));
        })
        .catch(err => {
          console.log('error:', err);
          res.status(500).send({
            message: err
          });
        });
  } catch (e) {
    res.status(500).send({
      message: e
    });
  }
};
