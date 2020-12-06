module.exports = app => {
  const warehouses = require("../../controllers/master_data/warehouse.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", warehouses.create);

  // Retrieve all Tutorials
  router.get("/", warehouses.findAll);

  // Retrieve all published Tutorials
  router.get("/published", warehouses.findAllPublished);

  router.get("/product/:product", warehouses.findAllWithCrop);

  // Retrieve a single Tutorial with id
  router.get("/:id", warehouses.findOne);



  // Update a Tutorial with id
  router.put("/:id", warehouses.update);

  // Delete a Tutorial with id
  router.delete("/:id", warehouses.delete);

  // Create a new Tutorial
  router.delete("/", warehouses.deleteAll);



  app.use("/api/warehouses", router);
};
