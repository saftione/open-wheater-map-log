const db = require("../../models");
const Storage = db.storages;



// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.type) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Tutorial
  const storage = new Storage({
    type: req.body.type,
    product: req.body.product,
    warehouse: req.body.warehouse,
    gross_weight: req.body.gross_weight,
    nett_weight: req.body.nett_weight,
    user: req.body.user,
    company: req.body.company,
    kontraktNr: req.body.kontraktNr,
    removal: req.body.removal,
    field: req.body.field,
    trailer: req.body.trailer,
    traktor: req.body.traktor,
    description: req.body.description,
    user: req.body.user,
    published: req.body.published ? req.body.published : false
  });

  // Save Tutorial in the database
  storage
    .save(storage)
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



exports.sumWarehouse = (req, res) => {

  const data = Storage.aggregate([
    {
      $group: {
        _id: { warehouse: "$warehouse" },
        total_nett_weight: { $sum: "$nett_weight" },
        total_gross_weight: { $sum: "$gross_weight" },
        count: { $sum: 1 },
        type1_total_nett_weight: {
          $sum: {
            $cond: [
              { $eq: ["$type", 1] }, "$nett_weight", 0
            ]
          }
        },
        type2_total_nett_weight: {
          $sum: {
            $cond: [
              { $eq: ["$type", 2] }, "$nett_weight", 0
            ]
          }
        },
        type1_total_gross_weight: {
          $sum: {
            $cond: [
              { $eq: ["$type", 1] }, "$gross_weight", 0
            ]
          }
        },
        type2_total_gross_weight: {
          $sum: {
            $cond: [
              { $eq: ["$type", 2] }, "$gross_weight", 0
            ]
          }
        }
      }
    },
    {
      $addFields: {
        divGrossNettType1: { "$subtract": ["$type1_total_gross_weight", "$type1_total_nett_weight"] },
        divGrossNettType2: { "$subtract": ["$type2_total_gross_weight", "$type2_total_nett_weight"] },
        divGrossNett: { "$subtract": ["$total_gross_weight", "$total_nett_weight"] },
        divTypediv: { "$subtract": [{ "$subtract": ["$type1_total_gross_weight", "$type1_total_nett_weight"] }, { "$subtract": ["$type2_total_gross_weight", "$type2_total_nett_weight"] }] },
      },

    },
    {
      $lookup: {
        from: "warehouses",
        localField: "_id.warehouse",
        foreignField: "_id",
        as: "warehouse_doc",

      }
    },
    {
      $lookup: {
        from: "products",
        localField: "warehouse_doc.product",
        foreignField: "_id",
        as: "product_doc"
      }

    },
  ])

    .exec(function (err, storages) {
      if (err) {
        if (err) {
          return console.log(err);
        } else {
          return console.log(result);
        };
      }
      res.send(storages);
    });
};

exports.sumKontrakte = (req, res) => {
  const user = req.params.user;
  console.log(user);
  const data = Storage.aggregate([
    //{ $match: { user: user } },
    {
      $group: {

        _id: { kontraktNr: "$kontraktNr" },
        total_nett_weight: { $sum: "$nett_weight" },
        total_gross_weight: { $sum: "$gross_weight" },
        count: { $sum: 1 },
        user: { $first: "$user" },
        total_weight: { $first: "$total_weight" },
        type1_total_nett_weight: {
          $sum: {
            $cond: [
              { $eq: ["$type", 1] }, "$nett_weight", 0
            ]
          }
        },
        type2_total_nett_weight: {
          $sum: {
            $cond: [
              { $eq: ["$type", 2] }, "$nett_weight", 0
            ]
          }
        },
        type1_total_gross_weight: {
          $sum: {
            $cond: [
              { $eq: ["$type", 1] }, "$gross_weight", 0
            ]
          }
        },
        type2_total_gross_weight: {
          $sum: {
            $cond: [
              { $eq: ["$type", 2] }, "$gross_weight", 0
            ]
          }
        }
      }
    },
    {
      $lookup: {
        from: "kontraktes",
        localField: "_id.kontraktNr",
        foreignField: "_id",
        as: "kontraktNr"
      }
    },
    {
      $unwind: {
        path: "$kontraktNr",
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $addFields: {
        divGrossNettType1: { "$subtract": ["$type1_total_gross_weight", "$type1_total_nett_weight"] },
        divGrossNettType2: { "$subtract": ["$type2_total_gross_weight", "$type2_total_nett_weight"] },
        divGrossNett: { "$subtract": ["$total_gross_weight", "$total_nett_weight"] },
        divTypediv: { "$subtract": [{ "$subtract": ["$type1_total_gross_weight", "$type1_total_nett_weight"] }, { "$subtract": ["$type2_total_gross_weight", "$type2_total_nett_weight"] }] },
        divTotalKonrakt: { "$subtract": ["$kontraktNr.total_weight", { "$subtract": ["$type2_total_gross_weight", "$type2_total_nett_weight"] }] },
      },
    },
    {
      $lookup: {
        from: "warehouses",
        localField: "_id.warehouse",
        foreignField: "_id",
        as: "warehouse_doc",

      }
    },
    {
      $lookup: {
        from: "products",
        localField: "warehouse_doc.product",
        foreignField: "_id",
        as: "product_doc"
      }

    },

  ])

    .exec(function (err, storages) {
      if (err) {
        if (err) {
          return console.log(err);
        } else {
          return console.log(result);
        };
      }
      res.send(storages);
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const type = req.query.type;
  var condition = type ? { type: { $regex: new RegExp(type), $options: "i" } } : {};

  Storage.find(condition)
    .populate("product")
    .populate({
      path: "warehouse",
      populate: { path: "product" }
    })
    .populate("company")
    .populate("field")
    .populate("trailer")
    .populate("traktor")
    .populate("kontraktNr")

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

// Retrieve all Tutorials from the database.
exports.findAllUserType = (req, res) => {

   type = req.query.type,
   user = req.query.user;
   const kontraktNr = req.query.kontraktNr;

  var condition = kontraktNr ? {type: type, user: user, kontraktNr: kontraktNr} : {type: type, user: user};

    Storage.find(condition)
      .populate("product")
      .populate({
        path: "warehouse",
        populate: { path: "product" }
      })
      .populate("company")
      .populate("field")
      .populate("trailer")
      .populate("traktor")
      .populate("kontraktNr")
      
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

  Storage.findById(id)
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



exports.findType = (req, res) => {
  const type = req.params.type;

  Storage.find({ type: type })
    .populate("product")
    .populate({
      path: "warehouse",
      populate: { path: "product" }
    })
    .populate("company")
    .populate("field")
    .populate("trailer")
    .populate("traktor")
    .populate("kontraktNr")
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

exports.findSameKontrakt = (req, res) => {
  const kontraktNr = req.params.kontraktNr;

  Storage.find({ kontraktNr: kontraktNr })
    .populate("product")
    .populate({
      path: "warehouse",
      populate: { path: "product" }
    })
    .populate("company")
    .populate("field")
    .populate("trailer")
    .populate("traktor")
    .populate("kontraktNr")
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

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Storage.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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

  Storage.findByIdAndRemove(id, { useFindAndModify: false })
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
  Storage.deleteMany({})
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
  Storage.find({ published: true })
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
