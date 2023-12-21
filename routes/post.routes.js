const Router = require("express").Router();
const upload = require("../config/multer");
const {
  createOne,
  getAll,
  getOne,
  update,
  deleteOne,
  getOneBySlug,
} = require("../controllers/post.controller");

Router.post("/", [upload.array("images", 2), createOne]);
Router.get("/", getAll);
Router.get("/:id", getOne);
Router.get("/slug/:slug", getOneBySlug);
Router.put("/:id", [upload.array("images", 2), update]);
Router.delete("/:id", deleteOne);

module.exports = Router;
