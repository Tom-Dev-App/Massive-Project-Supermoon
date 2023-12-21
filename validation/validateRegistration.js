const { query, db } = require("../config/database");

// REGEX PATTERNS
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneNumberPattern = /^\d{10,}$/;
const passwordPattern = /^(?=.*[a-zA-Z0-9!@#$%^&*]).{8,}$/;

const validateRegistrationFields = async (req, res, next) => {
  // Check for required fullname field
  if (!req.body.fullname || req.body.fullname.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Silahkan isi nama lengkap!",
    });
  }

  // Check for valid gender field (assuming gender is 1 or 2)
  if (req.body.gender != 1 && req.body.gender != 2) {
    return res.status(400).json({
      success: false,
      message: "Silahkan pilih jenis kelamin!",
    });
  }

  if (!req.body.email || req.body.email.trim() === "") {
    return res
      .status(400)
      .json({ success: false, message: "Silahkan isikan email!" });
  }
  // check email pattern
  if (!emailPattern.test(req.body.email)) {
    return res
      .status(400)
      .json({ success: false, message: "Silahkan isi email!" });
  }

  try {
    const [rows] = await db.query("SELECT email FROM users WHERE email = ?", [
      req.body.email,
    ]);

    console.log(rows);
    if (rows.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: "Data tidak valid!" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error!" });
  }

  // check phone
  if (!req.body.phone || req.body.phone.trim() === "") {
    return res
      .status(400)
      .json({ success: false, message: "Silahkan isi nomor telepon!" });
  }

  if (!phoneNumberPattern.test(req.body.phone)) {
    return res.status(400).json({
      success: false,
      message: "Silahkan isi nomor telepon dengan benar!",
    });
  }

  try {
    const [rows] = await db.query(
      "SELECT email FROM users WHERE phone_number = ?",
      [req.body.phone]
    );

    console.log(rows);
    if (rows.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: "Data tidak valid!" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error!" });
  }

  if (!req.body.password || req.body.password.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Silahkan password!",
    });
  }

  if (!passwordPattern.test(req.body.password)) {
    return res.status(400).json({
      success: false,
      message:
        "Password harus berisi huruf, satu nomor, satu simbol minimal 8 karakter!",
    });
  }

  if (!req.body.confirm_password || req.body.confirm_password.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Silahkan konfirmasi password!",
    });
  }

  if (req.body.password !== req.body.confirm_password) {
    return res.status(400).json({
      success: false,
      message: "Konfirmasi Password tidak cocok!",
    });
  }

  // If all checks pass, proceed to the next middleware or route handler
  next();
};

module.exports = validateRegistrationFields;
