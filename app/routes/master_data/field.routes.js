module.exports = app => {
  const fields = require("../../controllers/master_data/field.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", fields.create);

  // Retrieve all Tutorials
  router.get("/", fields.findAll);

  // Retrieve all published Tutorials
  router.get("/published", fields.findAllPublished);

  
  router.get("/product/:product", fields.findAllWithCrop);

  // Retrieve a single Tutorial with id
  router.get("/:id", fields.findOne);

  // Update a Tutorial with id
  router.put("/:id", fields.update);

  // Delete a Tutorial with id
  router.delete("/:id", fields.delete);

  // Create a new Tutorial
  router.delete("/", fields.deleteAll);

  app.use("/api/fields", router);
};
