const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
const { query, db } = require("../config/database");

const createBankAccount = asyncHandler(async (req, res) => {
  try {
    const { cardholder_name, account_number, bank_name } = req.body;

    const result = await query(
      "INSERT INTO banks (id_uuid, cardholder_name, account_number, bank_name, created_at) VALUES (?, ?, ?, ?, NOW())",
      [uuidv4(), cardholder_name, account_number, bank_name]
    );

    const insertedBankId = result.insertId;

    const newBank = await query("SELECT * FROM banks WHERE id = ?", [
      insertedBankId,
    ]);

    res.status(201).json({
      success: true,
      message: "Rekening bank ditambahkan!",
      data: newBank[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
    throw new Error("Gagal simpan rekening bank");
  }
});

const getAll = asyncHandler(async (req, res) => {
  try {
    const banks = await query("SELECT * FROM banks WHERE is_deleted = FALSE");
    res.status(200).json({
      success: true,
      message: "Success",
      data: banks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
    throw new Error("Gagal mengambil data semua rekening bank");
  }
});

const getOne = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const bank = await query(
      "SELECT * FROM banks WHERE id = ? AND is_deleted = FALSE",
      [id]
    );

    if (bank.length === 0) {
      res.status(404).json({ message: "Rekening Bank tidak ditemukan" });
    } else {
      res.status(200).json({
        success: true,
        message: "Success",
        data: bank[0],
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
    throw new Error("Gagal mengambil data rekening bank");
  }
});

const update = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { cardholder_name, account_number, bank_name } = req.body;

    await query(
      "UPDATE banks SET cardholder_name = ?, account_number = ?, bank_name = ?, updated_at = NOW() WHERE id = ? AND is_deleted = FALSE",
      [cardholder_name, account_number, bank_name, id]
    );

    const updatedBank = await query("SELECT * FROM banks WHERE id = ?", [id]);

    res.status(200).json({
      success: true,
      message: "Rekening bank diubah",
      data: updatedBank[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
    throw new Error("Gagal mengupdate rekening bank");
  }
});

const deleteOne = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    // Soft delete by marking as is_deleted = TRUE
    await query("UPDATE banks SET is_deleted = TRUE WHERE id = ?", [id]);

    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
    throw new Error("Gagal menghapus rekening bank");
  }
});

module.exports = {
  createBankAccount,
  getAll,
  getOne,
  update,
  deleteOne,
};
