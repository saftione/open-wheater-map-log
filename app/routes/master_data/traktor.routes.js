module.exports = app => {
  const traktors = require("../../controllers/master_data/traktor.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", traktors.create);

  // Retrieve all Tutorials
  router.get("/", traktors.findAll);

  // Retrieve all published Tutorials
  router.get("/published", traktors.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", traktors.findOne);

  // Update a Tutorial with id
  router.put("/:id", traktors.update);

  // Delete a Tutorial with id
  router.delete("/:id", traktors.delete);

  // Create a new Tutorial
  router.delete("/", traktors.deleteAll);

  app.use("/api/traktors", router);
};
