const express = require("express");
const router = express.Router();
const multer = require("../config/multer");
const {
  createLodging,
  updateLodging,
  deleteLodging,
  getAllLodgings,
  getOneLodging,
  uploadLodgingImages,
  updateLodgingImages,
  getAllFacilities,
  addLodgingFacility,
  updateLodgingFacility,
  getOneLodgingBySlug,
  getAll,
} = require("../controllers/lodging.controller");

// Middleware to handle image upload using Multer
const uploadLodgingImagesMiddleware = multer.array("images", 1);

// Routes
router.get("/all", getAll);
router.post("/", createLodging);
router.put("/:id", updateLodging);
router.delete("/delete/:id", deleteLodging);
router.get("/", getAllLodgings);
router.get("/:id", getOneLodging);
router.get("/slug/:slug", getOneLodgingBySlug);

router.post("/images/:id", uploadLodgingImagesMiddleware, uploadLodgingImages);
router.put("/images/:id", uploadLodgingImagesMiddleware, updateLodgingImages);

router.get("/facilities", getAllFacilities);
router.post("/facilities/:id", addLodgingFacility);
router.put("/facilities/:id", updateLodgingFacility);

module.exports = router;
