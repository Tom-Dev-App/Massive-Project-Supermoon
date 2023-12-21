require("dotenv").config();
const express = require("express");
const { NODE_PORT } = require("./config/configs");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const errorHandler = require("./middleware/errorHandler.middleware");
const app = express();
const morgan = require("morgan");
const tourPacketRoutes = require("./routes/tourPacket.routes");
const path = require("path");
const postRoutes = require("./routes/post.routes");
const lodgingRoutes = require("./routes/lodging.routes");
const culinaryRoutes = require("./routes/culinary.routes");
const bankRoutes = require("./routes/bank.routes");
const tourRoutes = require("./routes/tour.routes");
const upload = require("./config/multer");

app.use(morgan("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors({ origin: "*" }));

app.use(errorHandler);
app.use(
  "/public/images/",
  express.static(path.join(__dirname, "public/images/"))
);
app.use("/api/auth", authRoutes);
app.use("/api/tour-packets", tourPacketRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/lodgings", lodgingRoutes);
app.use("/api/culinaries", culinaryRoutes);
app.use("/api/banks", bankRoutes);
app.use("/api/tours", tourRoutes);

app.post("/upload", upload.array("images", 4), (req, res) => {
  console.log("UPLOAD MULTIPLES");

  const imagePath = req.file;
  console.log("req.file", imagePath);
  const imagePaths = req.files;
  console.log("req.files", imagePaths);
  res.json({
    data: imagePaths,
  });
});

app.post("/upload-single", upload.single("images"), (req, res) => {
  console.log("UPLOAD SINGLE");
  const imagePath = req.file;
  console.log("req.file", imagePath);
  const imagePaths = req.files;
  console.log("req.files", imagePaths);
  res.json({
    data: imagePath,
  });
});

app.listen(NODE_PORT, () => {
  console.log(
    `Server is running on PORT ${NODE_PORT} http://localhost:${NODE_PORT}`
  );
});
