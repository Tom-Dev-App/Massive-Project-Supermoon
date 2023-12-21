const { query, db } = require("../config/database");
const bcrypt = require("bcrypt");

// REGEX PATTERNS
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneNumberPattern = /^\d{10,}$/;
const passwordPattern = /^(?=.*[a-zA-Z0-9!@#$%^&*]).{8,}$/;

const validateRegistrationFields = async (req, res, next) => {
  if (!req.body.email || req.body.email.trim() === "") {
    return res
      .status(400)
      .json({ success: false, message: "Silahkan isikan email!" });
  }

  try {
    const [rows] = await db.query("SELECT email FROM users WHERE email = ?", [
      req.body.email,
    ]);

    console.log(rows);
    if (!rows.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: "Email atau Password salah!" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error!" });
  }

  if (!req.body.password || req.body.password.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Silahkan isi password!",
    });
  }

  try {
    const user = await query("SELECT * FROM users WHERE email = ?", [
      req.body.email,
    ]);

    
    if (!user || user.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Email atau Password salah!" });
    }

    const passwordHash = user[0].password;

    // Compare the entered password with the hashed password from the database
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      passwordHash
    );

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Email atau Password salah!" });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error!" });
    throw new Error("Error saat compare password login");
  }

  // If all checks pass, proceed to the next middleware or route handler
  //   next();
};

module.exports = validateRegistrationFields;
