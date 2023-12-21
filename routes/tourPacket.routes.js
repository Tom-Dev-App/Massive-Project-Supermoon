const Router = require("express").Router();
const {
  getCreateTourPacket,
  createTourPacket,
  updateTourPacket,
  deleteTourPacket,
  getAllTourPacket,
  getOneTourPacket,
  uploadImages,
  updateImages,
  addTourFacility,
  updateTourFacility,
  addCulinaryFacility,
  updateCulinaryFacilities,
  addLodgingFacility,
  updateLodgingFacilities,
  getAllFacilities,
  getOneTourPacketBySlug,
  getAll,
  getThree,
} = require("../controllers/tourPacket.controller");
const validateTourPacket = require("../validation/validateTourPacket");
const validateTourPacketUpdate = require("../validation/validateTourPacketUpdate");
const upload = require("../config/multer");

Router.get("/all", getAll);
Router.get('/Three', getThree)

Router.get("/create", getCreateTourPacket); // get data before creating tour
Router.post("/create", [validateTourPacket, createTourPacket]); // save data
Router.get("/", getAllTourPacket); //get retrive all data
// Router.put("/update/:id", [validateTourPacket, updateTourPacket]); // for updating tour information get slug and id from json
Router.put("/update/:id", [validateTourPacketUpdate, updateTourPacket]); // for updating tour information get slug and id from json
Router.get("/slug/:slug", getOneTourPacketBySlug); //MUST PROVIDE JSON ID
Router.delete("/delete/:id", deleteTourPacket); // for soft delete tour get id from json

Router.get("/facilities", getAllFacilities); // get all facilities for adding or updating wisata, penginapan, kuliner
// Wisata
Router.get("/:id", getOneTourPacket); //MUST PROVIDE JSON ID
Router.post("/tour-facilities/:id", addTourFacility);
// Router.post("/tour-facilities/:id", (req, res) => {
//   req.body;
//   res.json({ success: true });
// });
Router.put("/tour-facilities/:id", updateTourFacility);

// Penginapan
Router.post("/lodging-facilities/:id", addLodgingFacility);
Router.put("/lodging-facilities/:id", updateLodgingFacilities);

// kuliner
Router.post("/culinary-facilities/:id", addCulinaryFacility);
Router.put("/culinary-facilities/:id", updateCulinaryFacilities);

Router.post("/image/:id", [upload.array("images", 4), uploadImages]);

Router.put("/image/:id", [upload.array("images", 4), updateImages]);

module.exports = Router;
