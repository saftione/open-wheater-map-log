
module.exports = app => {

    const uploads = require("../../controllers/upload/validateKontrakte.controller.js");

    var router = require("express").Router();

    router.post("/", uploads.create);

    // Retrieve all Tutorials
    router.get("/", uploads.findAll);

    // Retrieve all published Tutorials
    router.get("/published", uploads.findAllPublished);

    // Retrieve a single Tutorial with id
    router.get("/:id", uploads.findOne);

    // Update a Tutorial with id
    router.put("/:id", uploads.update);

    // Delete a Tutorial with id
    router.delete("/:id", uploads.delete);

    // Create a new Tutorial
    router.delete("/", uploads.deleteAll);


    app.use("/api/validate", router);
};
