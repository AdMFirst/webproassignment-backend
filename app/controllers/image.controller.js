const db = require("../models");
const Image = db.images;

exports.upload = (req, res) => {
    const finalImage = {
        name: req.file.name,
        size: req.file.size,
        postId: req.body.postId,
        memberId: req.body.memberId,
        img: {
            contentType: req.file.mimetype,
            data: req.file.buffer,
        }
    };

    Image.create(finalImage, function (err, result) {
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
    Image.find({}, {name:1, _id:1, size: 1, postId: 1})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving images."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Image.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({message: "Not found Image with id " + id});
            else {
                res.contentType(data.img.contentType);
                res.send(data.img.data);
            }
        })
        .catch(err => {
            res
                .status(500)
                .send({message: "Error retrieving Image with id=" + id});
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Image.findByIdAndRemove(id, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Image with id=${id}. Maybe Image was not found!`
                });
            } else {
                res.send({
                    message: "Image was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Image with id=" + id
            });
        });
};