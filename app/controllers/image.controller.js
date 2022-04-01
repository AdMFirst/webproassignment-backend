const db = require("../models");
const Image = db.images;
const fs = require("fs");

exports.upload = (req, res) => {
    console.log(req.file)
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
            console.log(result.img.Buffer);
            console.log("Saved To database");
            res.contentType(finalImage.img.contentType);
            res.send(finalImage.img.data);
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