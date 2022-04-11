const db = require("../models");
const Video = db.videos;

exports.upload = (req, res) => {
    const finalVideo = {
        name: req.file.name,
        size: req.file.size,
        postId: req.body.postId,
        video: {
            contentType: req.file.mimetype,
            data: req.file.buffer,
        }
    };

    Video.create(finalVideo, function (err, result) {
        if (err) {
            res.status(500);
            res.send({ err });
        } else {
            result.img = undefined
            res.status(200);
            res.send(result);
        }
    })
};

exports.findAll = (req, res) => {
    Video.find().select("-video")
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving videos."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Video.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({message: "Not found Video with id " + id});
            else {
                res.contentType(data.video.contentType);
                res.send(data.video.data);
            }
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Video with id=" + id});
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Video.findByIdAndRemove(id, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Video with id=${id}. Maybe Video was not found!`
                });
            } else {
                res.send({
                    message: "Video was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Video with id=" + id
            });
        });
};