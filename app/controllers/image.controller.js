const db = require("../models");
const Image = db.images;

exports.upload = (req, res) => {
    const finalImage = {
        name: req.file.name,
        desc: 'String',
        img: {
            contentType: req.file.mimetype,
            data: req.file.buffer,
        }
    };

    Image.create(finalImage, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.status(200);
            res.send({ file: req.file });
        }
    })
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Image.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({message: "Not found Post with id " + id});
            else {
                res.contentType(data.img.contentType);
                res.send(data.img.data);
            }
        })
        .catch(err => {
            res
                .status(500)
                .send({message: "Error retrieving Post with id=" + id});
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