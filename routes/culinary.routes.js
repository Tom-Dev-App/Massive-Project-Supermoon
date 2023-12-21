const express = require("express");
const culinaryController = require("../controllers/culinary.controller");
const upload = require("../config/multer");

const router = express.Router();


router.get("/all", culinaryController.getAll);
router.post("/", culinaryController.createCulinary);
router.put("/:id", culinaryController.updateCulinary);
router.delete("/delete/:id", culinaryController.deleteCulinary);
router.get("/", culinaryController.getAllCulinaries);

router.get("/:id", culinaryController.getOneCulinary);
router.get("/slug/:slug", culinaryController.getCulinaryBySlug);

// Upload Culinary Images
router.post("/images/:id", [
  upload.array("images", 4),
  culinaryController.uploadCulinaryImage,
]);

// Update Culinary Image
router.put("/images/:id", [
  upload.array("images", 4),
  culinaryController.updateImage,
]);

// Get All Facilities
// router.get("/facilities", culinaryController.getAllFacilities);

// Add Culinary Facility

router.post("/facilities/:id", culinaryController.addCulinaryFacility);

// Update Culinary Facility
router.put("/facilities/:id", culinaryController.updateCulinaryFacility);

// Add more routes as needed...

module.exports = router;
