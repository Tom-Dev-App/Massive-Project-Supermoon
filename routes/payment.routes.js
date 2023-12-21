const Router = require("express").Router();
const {
  createOrder,
  getOrderById,
  getAllPaymentsByUserId,
  getAllPayments,
  updateOrderStatus,
  getAllOrderStatuses,
} = require("../controllers/payment.controller");
const upload = require("../config/multer");
const uploadMiddleware = upload.single("image");

Router.post("/", uploadMiddleware, createOrder);
Router.get("/:id", getOrderById);
Router.get("/user/:userId", getAllPaymentsByUserId);
Router.get("/", getAllPayments);
Router.put("/:orderId/update-status", updateOrderStatus);
Router.get("/order-statuses", getAllOrderStatuses);

module.exports = Router;
