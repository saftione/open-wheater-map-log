const db = require("../../models");
var resolve = require('resolve');
const Upload = db.validateKontraktes;
const Crop = db.products;
const Warehouse = db.warehouses;




// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.vkontraktNr) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  const productname = req.body.vproduct;
  var productcondition = productname ? { name: { $regex: new RegExp(productname), $options: "i" } } : {};

  const warehousename = req.body.vwarehouse;
  var warehousecondition = warehousename ? { name: { $regex: new RegExp(warehousename), $options: "i" } } : {};

  importproduct = {
    importString: "",
    importID: "",
    validated: ""
  };

  importwarehouse = {
    importString: "",
    importID: "",
    validated: "false"
  };

  Crop
    .findOne(productcondition)
    .exec()
    .then((result) => {
      if (result == null || productname === undefined) {

        importproduct = {
          importString: productname,
          importID: "5efa1cdf03d2d44024106b08",
          validated: "false"
        };

      } else {
        importproduct = {
          importString: productname,
          importID: result._id,
          validated: "true"
        };


      }

      return Warehouse
        .findOne(warehousecondition)
        .exec();
    })
    .then((result2) => {

      if (result2 == null || warehousename === undefined) {

        importwarehouse = {
          importString: warehousename,
          importID: "5efa1e2af640982a20ba4b0c",
          validated: "false"
        };

      } else {
        importwarehouse = {
          importString: warehousename,
          importID: result2._id,
          validated: "true"
        };
        console.log("warehouse", importwarehouse)
        console.log("product ", importproduct)

      }
      const upload = new Upload({

        kontraktNr: req.body.vkontraktNr,
        retailer: req.body.vretailer,
        product: importproduct,
        warehouse: importwarehouse,
        total_weight: req.body.vtotal_weight,
        user: req.body.user,
        company: req.body.company,
        money: req.body.vmoney,
        totalmoney: req.body.totalmoney,
        harvestYear: req.body.vharvestYear,
        pickupDate: req.body.vpickupDate,
        description: req.body.vdescription,
        published: req.body.published ? req.body.published : false
      });

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



    })
    .catch((error) => {
      // ... error handling
    });





};


// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const importFILE = req.body.kontraktNr;
  var condition = importFILE ? { kontraktNr: { $regex: new RegExp(importFILE), $options: "i" } } : {};

  Upload.find(condition)
    .populate({
      path: 'product.importID',
      model: Crop
    })
    .populate({
      path: 'warehouse.importID',
      model: Warehouse
    })
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
