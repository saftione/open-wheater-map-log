module.exports = app => {
  const companys = require("../../controllers/auth/company.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", companys.create);

  // Retrieve all Tutorials
  router.get("/", companys.findAll);

  // Retrieve all published Tutorials
  router.get("/published", companys.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", companys.findOne);

  // Update a Tutorial with id
  router.put("/:id", companys.update);

  // Delete a Tutorial with id
  router.delete("/:id", companys.delete);

  // Create a new Tutorial
  router.delete("/", companys.deleteAll);

  app.use("/api/companys", router);
};
