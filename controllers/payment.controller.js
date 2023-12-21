const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
const { query, db } = require("../config/database");

const createOrder = asyncHandler(async (req, res) => {
  try {
    const {
      tour_packet_id,
      user_id,
      bank_id,
      name,
      email,
      phone_number,
      bank_name,
      account_number,
      cardholder_name,
      price,
      tax,
      total,
      order_status_id,
    } = req.body;

    // Handle image upload using Multer
    const imgPath = req.file ? req.file.path : null;

    const result = await db.query(
      "INSERT INTO orders (id_uuid, tour_packet_id, user_id, bank_id, name, email, phone_number, bank_name, account_number, cardholder_name, price, tax, total, img_path, order_status_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())",
      [
        uuidv4(),
        tour_packet_id,
        user_id,
        bank_id,
        name,
        email,
        phone_number,
        bank_name,
        account_number,
        cardholder_name,
        price,
        tax,
        total,
        imgPath, // Use the Multer-uploaded image path
        order_status_id,
      ]
    );

    const insertedOrderId = result[0].insertId;

    const newOrder = await db.query("SELECT * FROM orders WHERE id = ?", [
      insertedOrderId,
    ]);

    res.status(201).json({
      success: true,
      message: "Pembelian Berhasil!",
      data: newOrder[0],
    });
  } catch (error) {
    console.error(error);

    // Delete the uploaded image if there is an error
    if (req.file) {
      await fs.unlink(req.file.path);
    }

    res.status(500).json({ message: "Internal Server Error" });
    throw new Error("Failed to create order");
  }
});

const getOrderById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    // Modify the SELECT statement to join tables
    const order = await db.query(
      `
      SELECT
        orders.*,
        users.fullname,
        tour_packets.title AS tour_packet_title,
        order_status.name AS order_status_name
      FROM
        orders
        JOIN users ON orders.user_id = users.id
        JOIN tour_packets ON orders.tour_packet_id = tour_packets.id
        JOIN order_status ON orders.order_status_id = order_status.id
      WHERE
        orders.id = ? AND orders.is_deleted = FALSE`,
      [id]
    );

    if (order[0].length === 0) {
      res.status(404).json({ message: "Order not found" });
    } else {
      res.status(200).json({
        success: true,
        message: "Success",
        data: order[0][0],
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
    throw new Error("Failed to get order data");
  }
});

const getAllPaymentsByUserId = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch all payments made by the user
    const payments = await db.query(
      "SELECT * FROM orders WHERE user_id = ? AND is_deleted = FALSE",
      [userId]
    );

    res.status(200).json({
      success: true,
      message: "Success",
      data: payments[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
    throw new Error("Failed to get payments for the user");
  }
});

const getAllPayments = asyncHandler(async (req, res) => {
  try {
    // Fetch all payments
    const payments = await db.query(
      "SELECT * FROM orders WHERE is_deleted = FALSE"
    );

    res.status(200).json({
      success: true,
      message: "Success",
      data: payments[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
    throw new Error("Failed to get all payments");
  }
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  try {
    const { orderId } = req.params;
    const { newStatusId } = req.body;

    // Check if the user making the request is an admin
    // Implement your own authentication and authorization logic here

    // Update the order status
    await db.query(
      "UPDATE orders SET order_status_id = ?, updated_at = NOW() WHERE id = ? AND is_deleted = FALSE",
      [newStatusId, orderId]
    );

    const updatedOrder = await db.query(
      "SELECT * FROM orders WHERE id = ? AND is_deleted = FALSE",
      [orderId]
    );

    res.status(200).json({
      success: true,
      message: "Order status has been updated",
      data: updatedOrder[0][0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
    throw new Error("Failed to update order status");
  }
});

const getAllOrderStatuses = asyncHandler(async (req, res) => {
  try {
    const orderStatuses = await db.query("SELECT id, name FROM order_status");

    res.status(200).json({
      success: true,
      message: "Success",
      data: orderStatuses[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
    throw new Error("Failed to get order statuses");
  }
});

module.exports = {
  createOrder,
  getOrderById,
  getAllPaymentsByUserId,
  getAllPayments,
  updateOrderStatus,
  getAllOrderStatuses,
};
