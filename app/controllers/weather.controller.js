const db = require("../models");
const Tutorial = db.tutorials;
const Weather = db.weathers;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Tutorial
  const tutorial = new Tutorial({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  });

  // Save Tutorial in the database
  tutorial
    .save(tutorial)
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
  const place = req.query.place;
  var condition = place ? { place: { $regex: new RegExp(place), $options: "i" } } : {};

  Weather.find(condition)
    .then(data => {
      //  console.log(data);
      var newtest = []; var dataTemp = []; var dataTime = []; var dataRain = [];
      var newdata = []
      for (let k in data) {
        newtest.push({ 'id': data[k].id, "date": data[k].createdAt, 'name': k, 'value': data[k].data[0].main.temp });
      }
      // newdata.push({ 'series': newtest, "name":'temp'});
      // console.log(newdata)
      rainnull = {
        "1h": 0
      }
      var rain;

      for (let k in data) {
        dataTemp.push(data[k].data[0].main.temp);
        if (data[k].data[0].rain == null) {
         rain=rainnull;
        } else {
          rain=data[k].data[0].rain;
        }
        dataRain.push(rain["1h"]);
        dataTime.push(data[k].createdAt);
      }


      newdata.push({ 'temp': dataTemp });
      newdata.push({ 'rain': dataRain });
      newdata.push({ 'time': dataTime });
      // console.log(newtest2)
      res.send(newdata);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
