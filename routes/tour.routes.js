const Router = require("express").Router();
const {
  createTour,
  updateTour,
  deleteTour,
  getOneTour,
  getAllTours,
  uploadImages,
  updateImages,
  getAllFacilities,
  addTourFacility,
  updateTourFacility,
  getOneTourBySlug,
  getAll,
  getThree,
} = require("../controllers/tour.controller");
const upload = require("../config/multer");


Router.get("/three", getThree);
Router.get("/", getAllTours);
Router.post("/", createTour);
Router.get("/slug/:slug", getOneTourBySlug);
Router.get("/:id", getOneTour);
Router.put("/update/:id", updateTour);
Router.delete("/delete/:id", deleteTour);

// add and update facilities
Router.post("/facilities/:id", addTourFacility);
Router.put("/facilities/:id", updateTourFacility);

// For handling user tour image
Router.post("/image/:id", [upload.array("images", 4), uploadImages]);
Router.put("/image/:id", [upload.array("images", 4), updateImages]);

Router.get("/data/all", getAll);
module.exports = Router;
