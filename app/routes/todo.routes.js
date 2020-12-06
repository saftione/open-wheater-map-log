module.exports = app => {
  const todos = require("../controllers/todo.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", todos.create);

  // Retrieve all Tutorials
  router.get("/", todos.findAll);

  // Delete a Tutorial with id
  router.delete("/:id", todos.delete);

  app.use("/api/todos", router);
};
