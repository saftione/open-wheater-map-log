module.exports = app => {
  const storages = require("../../controllers/movement/storage.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", storages.create);

  // Retrieve all Tutorials
  router.get("/", storages.findAll);

  router.get("/find/", storages.findAllUserType);

    // Retrieve all Tutorials
  router.get("/findtype/:type", storages.findType);

  router.get("/findkontrakt/:kontraktNr", storages.findSameKontrakt);


  // Retrieve all published Tutorials
  router.get("/published", storages.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", storages.findOne);

  // Update a Tutorial with id
  router.put("/:id", storages.update);

  router.put("/edit-student/:id", storages.update);
  // Delete a Tutorial with id
  router.delete("/:id", storages.delete);

  // Create a new Tutorial
  router.delete("/", storages.deleteAll);

  // Find all Products of a Company
  //router.get('/allWarehouse/:warehouseId',storages.findByWarehouseId);

  router.get('/sum/sum',storages.sumWarehouse);
  router.get('/sum/kontrakte/:user',storages.sumKontrakte);
  app.use("/api/storages", router);
};
