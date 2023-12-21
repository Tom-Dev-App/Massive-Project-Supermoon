const { query, db } = require("../config/database");
const validator = require("validator");
const isUrl = require("../utils/isUrl");

async function validateTourPacket(req, res, next) {
  if (!req.body.title || req.body.title.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Silahkan isi judul!",
    });
  }

  if (!validator.isLength(req.body.title, { min: 3, max: 255 })) {
    return res.status(400).json({
      success: false,
      message: "Silahkan isi judul min: 3 dan max: 255 karakter!",
    });
  }
  if (!req.body.slug || req.body.slug.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Silahkan isi judul!",
    });
  }

  if (!req.body.price || req.body.price.toString().trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Silahkan isi harga paket wisata!",
    });
  }
  let price = req.body.price;
  if (!validator.isInt(price)) {
    return res.status(400).json({
      success: false,
      message: "Silahkan isi harga paket wisata dengan benar!",
    });
  }

  if (!validator.isLength(req.body.slug, { min: 3, max: 255 })) {
    return res.status(400).json({
      success: false,
      message: "Silahkan isi slug min: 3 dan max: 255 karakter!",
    });
  }

  if (!req.body.address || req.body.address.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Silahkan isi alamat!",
    });
  }

  if (!req.body.address_link || req.body.address_link.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Silahkan isi url alamat!",
    });
  }

  if (isUrl(req.body.address_link === false)) {
    return res.status(400).json({
      success: false,
      message: "Silahkan isi url alamat dengan benar!",
    });
  }

  if (!req.body.description || req.body.description.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Silahkan isi deskripsi paket wisata!",
    });
  }

  if (!req.body.tour_description || req.body.tour_description.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Silahkan isi deskripsi wisata!",
    });
  }

  if (!req.body.tour_link || req.body.tour_link.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Silahkan isi url alamat wisata!",
    });
  }

  if (isUrl(req.body.tour_link) === false) {
    return res.status(400).json({
      success: false,
      message: "Silahkan isi url alamat wisata dengan benar!",
    });
  }

  if (
    !req.body.culinary_description ||
    req.body.culinary_description.trim() === ""
  ) {
    return res.status(400).json({
      success: false,
      message: "Silahkan isi deskripsi kuliner!",
    });
  }

  if (!req.body.culinary_link || req.body.culinary_link.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Silahkan isi url alamat kuliner!",
    });
  }

  if (isUrl(req.body.culinary_link === false)) {
    return res.status(400).json({
      success: false,
      message: "Silahkan isi url alamat kuliner dengan benar!",
    });
  }

  if (
    !req.body.lodging_description ||
    req.body.lodging_description.trim() === ""
  ) {
    return res.status(400).json({
      success: false,
      message: "Silahkan isi deskripsi penginapan!",
    });
  }

  if (!req.body.lodging_link || req.body.lodging_link.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Silahkan isi url alamat penginapan!",
    });
  }

  if (!isUrl(req.body.lodging_link)) {
    return res.status(400).json({
      success: false,
      message: "Silahkan isi url alamat penginapan dengan benar!",
    });
  }

  next();
}

module.exports = validateTourPacket;
