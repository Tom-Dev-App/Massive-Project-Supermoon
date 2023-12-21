const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
const { query, db } = require("../config/database");

const createReview = asyncHandler(async (req, res) => {
  try {
    const { tour_packet_id, user_id, rating, content } = req.body;

    const result = await db.query(
      "INSERT INTO tour_packet_has_reviews (id_uuid, tour_packet_id, user_id, rating, content, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())",
      [uuidv4(), tour_packet_id, user_id, rating, content]
    );

    const insertedReviewId = result[0].insertId;

    const newReview = await db.query(
      "SELECT * FROM tour_packet_has_reviews WHERE id = ?",
      [insertedReviewId]
    );

    res.status(201).json({
      success: true,
      message: "Review has been created",
      data: newReview[0][0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
    throw new Error("Failed to create review");
  }
});

const getAllReviews = asyncHandler(async (req, res) => {
  try {
    const reviews = await db.query(
      "SELECT * FROM tour_packet_has_reviews WHERE is_deleted = FALSE"
    );

    res.status(200).json({
      success: true,
      message: "Success",
      data: reviews[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
    throw new Error("Failed to get reviews");
  }
});

const getReviewById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const review = await db.query(
      "SELECT * FROM tour_packet_has_reviews WHERE id = ? AND is_deleted = FALSE",
      [id]
    );

    if (review[0].length === 0) {
      res.status(404).json({ message: "Review not found" });
    } else {
      res.status(200).json({
        success: true,
        message: "Success",
        data: review[0][0],
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
    throw new Error("Failed to get review data");
  }
});

const updateReview = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, content } = req.body;

    await db.query(
      "UPDATE tour_packet_has_reviews SET rating = ?, content = ?, updated_at = NOW() WHERE id = ? AND is_deleted = FALSE",
      [rating, content, id]
    );

    const updatedReview = await db.query(
      "SELECT * FROM tour_packet_has_reviews WHERE id = ? AND is_deleted = FALSE",
      [id]
    );

    res.status(200).json({
      success: true,
      message: "Review has been updated",
      data: updatedReview[0][0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
    throw new Error("Failed to update review");
  }
});

const deleteReview = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    // Soft delete by marking as is_deleted = TRUE
    await db.query(
      "UPDATE tour_packet_has_reviews SET is_deleted = TRUE WHERE id = ?",
      [id]
    );

    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
    throw new Error("Failed to delete review");
  }
});

module.exports = {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
};
