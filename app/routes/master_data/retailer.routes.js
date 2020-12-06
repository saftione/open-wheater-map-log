module.exports = app => {
  const retailers = require("../../controllers/master_data/retailer.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", retailers.create);

  // Retrieve all Tutorials
  router.get("/", retailers.findAll);

  // Retrieve all published Tutorials
  router.get("/published", retailers.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", retailers.findOne);

  // Update a Tutorial with id
  router.put("/:id", retailers.update);

  // Delete a Tutorial with id
  router.delete("/:id", retailers.delete);

  // Create a new Tutorial
  router.delete("/", retailers.deleteAll);

  app.use("/api/retailers", router);
};
