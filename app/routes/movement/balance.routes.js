module.exports = app => {
  const balances = require("../../controllers/movement/balance.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", balances.create);

  // Retrieve all Tutorials


  router.get("/", balances.findAll);
  // Update a Tutorial with id
  router.put("/:id", balances.update);

  router.get("/:id", balances.findBalance);

  // Find all Products of a Company

  app.use("/api/balances", router);
};
