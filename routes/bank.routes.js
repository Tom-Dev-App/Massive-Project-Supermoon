const Router = require("express").Router();
const {
  createBankAccount,
  getAll,
  getOne,
  update,
  deleteOne,
} = require("../controllers/bank.controller");

Router.get("/", getAll);
Router.post("/", createBankAccount);
Router.get("/:id", getOne);
Router.put("/:id", update);
Router.delete("/:id", deleteOne);

module.exports = Router;
