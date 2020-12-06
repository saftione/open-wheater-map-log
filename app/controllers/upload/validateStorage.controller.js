const db = require("../../models");
const Upload = db.validateStorages;
const Crop = db.products;
const Warehouse = db.warehouses;
const Kontrakte = db.kontrakts;




// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.vproduct) {
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
    validated: ""
  };



  Crop
    .findOne(productcondition)
    .exec()
    .then((result) => {
      if (result == null) {

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
      return Warehouse.findOne(warehousecondition).exec();
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
        date: req.body.vdate,
        type: req.body.vtype,
        kontraktNr: importkontraktNr,
        product: importproduct,
        warehouse: importwarehouse,
        gross_weight: req.body.vgross_weight,
        nett_weight: req.body.vnett_weight,
        traktor: req.body.vtraktor,
        trailer: req.body.vtrailer,
        field: req.body.vfield,
        company: req.body.company,
        user: req.body.user,
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

exports.createRemoval = (req, res) => {
  // Validate request
  if (!req.body.vproduct) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  const productname = req.body.vproduct;
  var productcondition = productname ? { name: { $regex: new RegExp(productname), $options: "i" } } : {};

  const warehousename = req.body.vwarehouse;
  var warehousecondition = warehousename ? { name: { $regex: new RegExp(warehousename), $options: "i" } } : {};

  
  const kontraktNrname = req.body.vkontraktNr;
  var kontraktNrcondition = kontraktNrname ? { kontraktNr: { $regex: new RegExp(kontraktNrname), $options: "i" } } : {};

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

  importkontraktNr = {
    importString: "",
    importID: "",
    validated: ""
  };

  Crop
    .findOne(productcondition)
    .exec()
    .then((result) => {
      if (result == null) {

        importproduct = {
          importString: productname,
          validated: "false"
        };

      } else {
        importproduct = {
          importString: productname,
          importID: result._id,
          validated: "true"
        };


      }

      return Warehouse.findOne(warehousecondition).exec();

    })
    .then((result2) => {

      if (result2 == null || warehousename === undefined) {

        importwarehouse = {
          importString: warehousename,
          validated: "false"
        };

      } else {
        importwarehouse = {
          importString: warehousename,
          importID: result2._id,
          validated: "true"
        };
      }
      return Kontrakte.findOne(kontraktNrcondition).exec();
    })
    .then((result3) => {

      if (result3 == null || kontraktNrname === undefined) {

        importkontraktNr = {
          importString: kontraktNrname,
          importID:"5efee63825c4320e14dac227",
          validated: "false"
        };

      } else {
        importkontraktNr = {
          importString: kontraktNrname,
          importID: result3._id,
          validated: "true"
        };
        console.log("warehouse", importwarehouse)
        console.log("product ", importproduct)
        console.log("kontrakt ", importkontraktNr)

      }

      const upload = new Upload({
        date: req.body.vdate,
        type: req.body.vtype,
        product: importproduct,
        warehouse: importwarehouse,
        kontraktNr: importkontraktNr,
        gross_weight: req.body.vgross_weight,
        nett_weight: req.body.vnett_weight,
        traktor: req.body.vtraktor,
        trailer: req.body.vtrailer,
        field: req.body.vfield,
        company: req.body.company,
        user: req.body.user,
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
  const importFILE = req.body.type;
  var condition = importFILE ? { type: { $regex: new RegExp(importFILE), $options: "i" } } : {};

  Upload.find(condition)
    .populate({
      path: 'product.importID',
      model: Crop
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
  const displaytype = req.params.id;

  Upload.find({ type: displaytype })
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
