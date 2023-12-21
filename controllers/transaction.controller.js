const asynchandler = require("express-async-handler");
const { query, db } = require("../config/database");

const allPayments = asynchandler(async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM payments");
    if (rows.length === 0) {
      return res.status(404).json({
        success: true,
        message: "Not Transactions!",
        data: [],
      });
    }
    return res.status(200).json({
      success: true,
      message: "ok",
      data: {
        transactions: rows,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
      data: [],
    });
  }
});

const getPaymentId = asynchandler(async (req, res) => {
  const paymentId = req.params.id;

  try {
    const data = await query("SELECT * FROM payments WHERE id_uuid = ?", [
      paymentId,
    ]);

    if (data.length === 0) {
      return res.status(404).json({
        message: "Payment not found",
        success: false,
        data: [],
      });
    }

    return res.json({
      message: "Payment not found",
      success: false,
      data: data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

const createOrder = asynchandler(async (req, res) => {
  const { orderId, amount, paymentDate } = req.body;

  try {
    const [result] = await pool.execute(
      "INSERT INTO payments (id_uuid, order_id, amount, payment_date, created_at) VALUES (?, ?, ?, ?, NOW())",
      [uuid.v4(), orderId, amount, paymentDate]
    );

    const paymentId = result.insertId;
    res.json({ id: paymentId, orderId, amount, paymentDate });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
