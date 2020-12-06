const db = require("../../models");
const Balance = db.balances;



// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.weight) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Tutorial
  const balance = new Balance({
    weight: req.body.weight,
    user: req.body.user,
    company: req.body.company,
    published: req.body.published ? req.body.published : false
  });

  // Save Tutorial in the database
  balance
    .save(balance)
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

exports.findAll = (req, res) => {

  Balance.find()
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

exports.findBalance = (req, res) => {
  const id = req.params.id;
  console.log("sd",id);
  
  Balance.findById("5fbd427cc1169a453c745a47")
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
//console.log("sd",id);

  Balance.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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

