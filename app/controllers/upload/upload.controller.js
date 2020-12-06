const db = require("../../models");
const Upload = db.uploads;
require('dotenv').config();

const Tutorial = db.tutorials;
const fs = require('fs');
const fastcsv = require("fast-csv");



global.__basedir = __dirname;



exports.createupload = (req, res) => {
  importCsvData2MongoDB(__basedir + '/../upload/' + req.file.filename, req.file);


  res.json({
    'msg': 'File uploaded/import successfully!', 'file': req.file
  });
};




// -> Import CSV File to database
function importCsvData2MongoDB(filePath, fileinfos) {

  let stream = fs.createReadStream(filePath);
  // console.log(filePath);
  // console.log(fileinfos.originalname);
  let csvData = [];

  let csvStream = fastcsv
    .parse({ delimiter: ';' })
    .on("data", function (data) {
      // console.log(data);
      csvData.push({
        data
        //description: data[1]
        // description: data[2],
        // createdAt: data[3]
      });
    })
    .on("end", function () {
      // remove the first line: header
      csvData.shift();
      // console.log(csvData);
      const uploadname = new Upload({
        importFILE: fileinfos.originalname,
        importtype: "importtype",
        any: [csvData]
      });

      uploadname
        .save(uploadname);



      /*
            Upload
              .findByIdAndUpdate(
                "5ee3d038f90b5640e8b3a1b8",
                { $push: { any: csvData } },
                function (error, success) {
                  if (error) {
                    console.log(error);
                  } else {
                    console.log(success);
                  }
                });
      */


      // console.log(Upload.findById("5ee3d00c6acf393b4c066d9a"));


    });

  stream.pipe(csvStream);
}









// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.importFILE) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Tutorial
  const upload = new Upload({
    importFILE: req.body.importFILE,
    importtype: req.body.importtype,
    any: req.body.any
  });

  // Save Tutorial in the database
  upload
    .save(upload)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const importFILE = req.query.importFILE;
  var condition = importFILE ? { importFILE: { $regex: new RegExp(importFILE), $options: "i" } } : {};

  Upload.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Tutorial.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Tutorial with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Tutorial with id=" + id });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      } else res.send({ message: "Tutorial was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Tutorial.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      } else {
        res.send({
          message: "Tutorial was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Upload.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Tutorials were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  Tutorial.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
