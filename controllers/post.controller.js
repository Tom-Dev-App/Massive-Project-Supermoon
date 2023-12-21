const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const { query, db } = require("../config/database");
const toDatetime = require("../utils/datetime");
const generateSlug = require("../utils/generateSlug");
const fs = require("fs/promises");

function fixImagePath(imagePath) {
  return imagePath.replace(/\\\\/g, "/");
}

const createOne = asyncHandler(async (req, res) => {
  let imagePaths = [];
  try {
    const { title, content } = req.body;

    // Access the file details using req.files
    imagePaths = req.files.map((file) =>
      path.join("/public/images/", `${file.filename}`)
    );

    const result = await db.query(
      "INSERT INTO posts (title, slug, content, img_path, is_published) VALUES (?, ?, ?, ?, ?)",
      [title, generateSlug(title), content, fixImagePath(imagePaths[0]), true]
    );

    const insertedPostId = result[0].insertId;

    const newPost = await db.query("SELECT * FROM posts WHERE id = ?", [
      insertedPostId,
    ]);

    res.status(201).json({
      success: true,
      message: "Artikel telah disimpan",
      data: newPost[0],
    });
  } catch (error) {
    console.error(error);

    // Delete the uploaded image if there is an error
    if (req.file) {
      await fs.unlink(req.file.path);
    }

    res.status(500).json({ message: "Internal Server Error" });
    throw new Error("Gagal membuat post");
  }
});

const getAll = asyncHandler(async (req, res) => {
  try {
    const posts = await db.query(
      "SELECT * FROM posts WHERE is_deleted = FALSE"
    );
    res.status(200).json({
      success: true,
      message: "Success",
      data: posts[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
    throw new Error("Gagal mendapatkan data posts");
  }
});

const getOne = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const post = await db.query(
      "SELECT * FROM posts WHERE id = ? AND is_deleted = FALSE",
      [id]
    );

    if (post[0].length === 0) {
      res.status(404).json({ message: "Artikel tidak ditemukan" });
    } else {
      res.status(200).json({
        success: true,
        message: "Success",
        data: post[0][0],
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
    throw new Error("Gagal mendapatkan data post");
  }
});

const getOneBySlug = asyncHandler(async (req, res) => {
  try {
    const { slug } = req.params;
    const post = await db.query(
      "SELECT * FROM posts WHERE slug = ? AND is_deleted = FALSE",
      [slug]
    );

    if (post[0].length === 0) {
      res.status(404).json({ message: "Artikel tidak ditemukan" });
    } else {
      res.status(200).json({
        success: true,
        message: "Success",
        data: post[0][0],
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
    throw new Error("Gagal mendapatkan data post");
  }
});

const update = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const imgPath = req.file ? req.file.path : null;

    // Fetch the existing post data
    const existingPost = await db.execute("SELECT * FROM posts WHERE id = ?", [
      id,
    ]);

    if (existingPost[0].length === 0) {
      return res.status(404).json({ message: "Artikel tidak ditemukan" });
    }

    // Update the post data
    await pool.execute(
      "UPDATE posts SET title = ?, slug = ?, content = ?, updated_at = NOW(), img_path = ? WHERE id = ? AND is_deleted = FALSE",
      [title, generateSlug(title), content, imgPath, id]
    );

    // Delete the old image if a new image is uploaded
    if (req.file && existingPost[0][0].img_path) {
      await fs.unlink(existingPost[0][0].img_path);
    }

    const updatedPost = await db.execute("SELECT * FROM posts WHERE id = ?", [
      id,
    ]);

    res.status(200).json({
      success: true,
      message: "Artikel telah dirubah",
      data: updatedPost[0][0],
    });
  } catch (error) {
    console.error(error);

    // Delete the uploaded image if there is an error
    if (req.file) {
      await fs.unlink(req.file.path);
    }

    res.status(500).json({ message: "Internal Server Error" });
    throw new Error("Gagal merubah data post");
  }
});

const deleteOne = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    // Soft delete by marking as is_deleted = TRUE
    await db.execute("UPDATE posts SET is_deleted = TRUE WHERE id = ?", [id]);

    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
    throw new Error("Gagal menghapus data post");
  }
});

module.exports = {
  createOne,
  getAll,
  getOne,
  update,
  deleteOne,
  getOneBySlug,
};
