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
      //console.log(data);
      var datat0 = []; var dataTemp = []; var dataTime = []; var dataRain = []; var newdata = []; var dataMoisture = [];
      //console.log(data)
      // newdata.push({ 'series': newtest, "name":'temp'});
      // console.log(newdata)
      rainnull = {
        "1h": 0
      }
      var rain;

      for (let k in data) {

        dataTemp.push(data[k].dataAir[0].main.temp);
        if (data[k].dataAir[0].rain == null) {
          rain = rainnull;
        } else {
          rain = data[k].dataAir[0].rain;
        }
        dataRain.push(rain["1h"]);
        dataMoisture.push(data[k].dataSoil[0].moisture);
        datat0.push(data[k].dataSoil[0].t0);
        dataTime.push(data[k].createdAt);

      }


      newdata.push({ 'temp': dataTemp });
      newdata.push({ 'rain': dataRain });
      newdata.push({ 'time': dataTime });
      newdata.push({ 'moisture': dataMoisture });
      newdata.push({ 't0': datat0 });
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
