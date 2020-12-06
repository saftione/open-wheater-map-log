const db = require("../../models");
const { kontrakts } = require("../../models");
const Kontrakt = db.kontrakts;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.kontraktNr) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Tutorial
  const kontrakt = new Kontrakt({
    kontraktNr: req.body.kontraktNr,
    product: req.body.product,
    warehouse: req.body.warehouse,
    retailer: req.body.retailer,
    total_weight: req.body.total_weight,
    user: req.body.user,
    company: req.body.company,
    money: req.body.money,
    retailer: req.body.retailer,
    totalmoney: req.body.totalmoney,
    harvestYear: req.body.harvestYear,
    pickupDate: req.body.pickupDate,
    description: req.body.description,
    transacted: req.body.transacted ? req.body.transacted : false,
    deleted: req.body.deleted ? req.body.deleted : false
  });

  // Save Tutorial in the database
  kontrakt
    .save(kontrakt)
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
  const kontraktNr = req.query.kontraktNr;
  var condition = kontraktNr ? { kontraktNr: { $regex: new RegExp(kontraktNr), $options: "i" } } : {};

  Kontrakt.find(condition)
    .populate("retailer")
    .populate("product")
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

exports.findUserSum = (req, res) => {
  const user = req.params.user;
  // console.log(user)
  Kontrakt.aggregate([
    //{ $match: { user: user } },
    //{ $sort: { name: 1 } },

    {
      $lookup: {
        from: 'storages',
        localField: '_id',
        foreignField: 'kontraktNr',
        as: 'KontraktWeight'
      }
    },
    {
      $unwind: {
        path: "$KontraktWeight",
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $lookup: {
        from: 'products',
        localField: 'product',
        foreignField: '_id',
        as: 'product'
      }
    },
    {
      $unwind: {
        path: "$product",
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $lookup: {
        from: 'retailers',
        localField: 'retailer',
        foreignField: '_id',
        as: 'retailer'
      }
    },
    {
      $unwind: {
        path: "$retailer",
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $group: {
        _id: { _id: "$_id", user: "$user" },
        type2_total_nett_weight: {
          $sum: {
            $cond: [
              { $eq: ["$KontraktWeight.type", 2] }, "$KontraktWeight.nett_weight", 0
            ]
          }
        },
        type2_total_gross_weight: {
          $sum: {
            $cond: [
              { $eq: ["$KontraktWeight.type", 2] }, "$KontraktWeight.gross_weight", 0
            ]
          }
        },
        total_gross_weight: { $sum: "$KontraktWeight.gross_weight" },
        count: { $sum: 1 },
        id: { $first: "$_id" },
        kontraktNr: { $first: "$kontraktNr" },
        retailer: { $first: "$retailer" },
        product: { $first: "$product" },
        warehouse: { $first: "$warehouse" },
        money: { $first: "$money" },
        totalmoney: { $first: "$totalmoney" },
        harvestYear: { $first: "$harvestYear" },
        pickupDate: { $first: "$pickupDate" },
        company: { $first: "$company" },
        transacted: { $first: "$transacted" },
        description: { $first: "$description" },
        total_weight: { $first: "$total_weight" },
      }
    },
    {
      $addFields: {
        divGrossNettType2: { "$subtract": ["$type2_total_gross_weight", "$type2_total_nett_weight"] },
        divTotalWeightKonraktToremovalWeight: { $subtract: ["$total_weight", { "$subtract": ["$type2_total_gross_weight", "$type2_total_nett_weight"] }] },
        mulTotalWeight_money: { $multiply: ["$total_weight", "$money"] }
      },

    },

  ])
    .exec(function (err, kontrakts) {
      if (err) {
        if (err) {
          return console.log(err);
        } else {
          return console.log(result);
        };
      }
      res.send(kontrakts);
    });
};

exports.findAllUser = (req, res) => {
  const user = req.params.user;
  
  Kontrakt.find({ user: user })

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

  Kontrakt.findById(id)
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

  Kontrakt.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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

  Kontrakt.findByIdAndRemove(id, { useFindAndModify: false })
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
  Kontrakt.deleteMany({})
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
  Kontrakt.find({ published: true })
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

exports.findAllWithCrop = (req, res) => {
  const product = req.params.product;
  Kontrakt.find({ product: product })
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
