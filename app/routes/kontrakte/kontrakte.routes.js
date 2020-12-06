module.exports = app => {
  const kontrakts = require("../../controllers/kontrakte/kontrakte.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", kontrakts.create);

  // Retrieve all Tutorials
  router.get("/", kontrakts.findAll);

  router.get("/find2/:user", kontrakts.findAllUser);
  router.get("/find/:user", kontrakts.findUserSum);
  // Retrieve all published Tutorials
  router.get("/published", kontrakts.findAllPublished);

  router.get("/product/:product", kontrakts.findAllWithCrop);
  //router.get("/company/:company", kontrakts.findAllWithCompany);
  // Retrieve a single Tutorial with id
  router.get("/:id", kontrakts.findOne);

  // Update a Tutorial with id
  router.put("/:id", kontrakts.update);

  // Delete a Tutorial with id
  router.delete("/:id", kontrakts.delete);

  // Create a new Tutorial
  router.delete("/", kontrakts.deleteAll);



  app.use("/api/kontrakts", router);
};
