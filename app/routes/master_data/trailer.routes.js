module.exports = app => {
  const trailers = require("../../controllers/master_data/trailer.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", trailers.create);

  // Retrieve all Tutorials
  router.get("/", trailers.findAll);

  // Retrieve all published Tutorials
  router.get("/published", trailers.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", trailers.findOne);

  // Update a Tutorial with id
  router.put("/:id", trailers.update);

  // Delete a Tutorial with id
  router.delete("/:id", trailers.delete);

  // Create a new Tutorial
  router.delete("/", trailers.deleteAll);

  app.use("/api/trailers", router);
};
