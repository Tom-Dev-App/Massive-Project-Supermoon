const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const { query, db } = require("../config/database");
const toDatetime = require("../utils/datetime");
const generateSlug = require("../utils/generateSlug");
const fs = require("fs/promises");

// CULINARY
const createCulinary = asyncHandler(async (req, res) => {
  const {
    title,
    slug,
    categories,
    price,
    address,
    address_link,
    description,
    ticket_operasional,
  } = req.body;
  const formatSlug = generateSlug(slug);

  try {
    const [checkslug] = await db.query(
      "SELECT slug FROM culinaries where slug = ?",
      [slug]
    );

    if (checkslug.length > 1) {
      return res.status(400).json({
        success: false,
        message: "Slug sudah dipakai, silahkan ganti!",
      });
    }

    let newDatetime = toDatetime(Date.now());
    const data = await query(
      `INSERT INTO culinaries (title, slug, categories, price, address, address_link, description, ticket_operasional, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        formatSlug,
        categories,
        parseInt(price),
        address,
        address_link,
        description,
        ticket_operasional,
        newDatetime,
        newDatetime,
      ]
    );

    if (!data.length > 0) {
      res.json({
        success: false,
        message: "Kuliner gagal dibuat!",
        data: "",
      });
    }

    res.json({
      success: true,
      message: "Kuliner telah dibuat!",
      data: "",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error!" });
    throw new Error("Error saat menyimpan data kuliner!");
  }
});

const updateCulinary = asyncHandler(async (req, res) => {
  const {
    title,
    slug,
    categories,
    price,
    address,
    address_link,
    description,
    ticket_operasional,
  } = req.body;
  const formatSlug = generateSlug(slug);

  try {
    const [checkSlug] = await db.query(
      "SELECT slug FROM culinaries WHERE slug = ? AND id != ?",
      [formatSlug, req.params.id]
    );

    if (checkSlug.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Slug sudah dipakai, silahkan ganti!",
      });
    }

    const newDatetime = toDatetime(Date.now());
    const data = await query(
      `UPDATE culinaries SET 
        title = ?, 
        slug = ?,
        categories = ?, 
        price = ?, 
        address = ?, 
        address_link = ?, 
        description = ?, 
        ticket_operasional = ?,
        updated_at = ? 
        WHERE id = ?`,
      [
        title,
        formatSlug,
        categories,
        parseInt(price),
        address,
        address_link,
        description,
        ticket_operasional,
        newDatetime,
        req.params.id,
      ]
    );

    if (!data.affectedRows) {
      return res.json({
        success: false,
        message: "Kuliner tidak ditemukan!",
      });
    }

    return res.json({
      success: true,
      message: "Kuliner berhasil diperbarui!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error!" });
    throw new Error("Error saat mengubah data kuliner!");
  }
});

const deleteCulinary = asyncHandler(async (req, res) => {
  try {
    const newDatetime = toDatetime(Date.now());
    const data = await query(
      `UPDATE culinaries SET is_deleted = true, updated_at = ? WHERE id = ?`,
      [newDatetime, req.params.id]
    );

    if (!data.affectedRows) {
      return res.json({
        success: false,
        message: "Kuliner tidak ditemukan!",
      });
    }

    return res.json({
      success: true,
      message: "Kuliner berhasil dihapus!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error!" });
    throw new Error("Error saat menghapus kuliner!");
  }
});

const getAllCulinaries = asyncHandler(async (req, res) => {
  try {
    const culinaryDetails = await query(`
      SELECT
        c.id,
        c.title,
        c.slug,
        c.categories,
        c.price,
        c.address,
        c.address_link,
        c.description,
        c.ticket_operasional,
        c.created_at,
        c.updated_at,
        COALESCE(AVG(cr.rating), 0) AS average_rating
      FROM
        culinaries c
      LEFT JOIN
        culinary_has_reviews cr ON c.id = cr.culinary_id AND cr.is_deleted = FALSE
      WHERE c.is_deleted = FALSE
      GROUP BY
        c.id;
    `);

    if (culinaryDetails.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Kuliner not found or has been deleted!",
      });
    }

    const culinaryImages = await query(`
      SELECT
        culinary_id,
        id,
        img_path
      FROM
        culinary_images
      WHERE
        is_deleted = FALSE;
    `);

    const culinaryFacilities = await query(`
      SELECT
        chf.culinary_id, chf.facility_id, f.name
      FROM
        culinary_has_facilities chf
      JOIN
        facilities f ON chf.facility_id = f.id
      WHERE
        chf.is_deleted = FALSE;
    `);

    const reviews = await query(`
      SELECT
        cr.culinary_id,
        cr.rating,
        cr.content,
        u.fullname
      FROM
        culinary_has_reviews cr
      JOIN
        users u ON cr.user_id = u.id
      WHERE
        cr.is_deleted = FALSE;
    `);

    const formattedCulinaryDetails = {
      culinaries: culinaryDetails,
      culinary_images: culinaryImages,
      culinary_facilities: culinaryFacilities,
      reviews: reviews,
    };

    res.status(200).json({
      success: true,
      message: "Success",
      data: formattedCulinaryDetails,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
    throw new Error("Failed to fetch culinary data!");
  }
});

const getOneCulinary = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const culinaryDetails = await query(
      `
      SELECT
        c.id,
        c.title,
        c.slug,
        c.categories,
        c.price,
        c.address,
        c.address_link,
        c.description,
        c.ticket_operasional,
        c.created_at,
        c.updated_at,
        COALESCE(AVG(cr.rating), 0) AS average_rating
      FROM
        culinaries c
      LEFT JOIN
        culinary_has_reviews cr ON c.id = cr.culinary_id AND cr.is_deleted = FALSE
      WHERE
        c.id = ?
        AND c.is_deleted = FALSE
      GROUP BY
        c.id;
    `,
      [id]
    );

    if (culinaryDetails.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Kuliner not found or has been deleted!",
      });
    }

    const culinaryImages = await query(
      `
      SELECT
        id,
        img_path
      FROM
        culinary_images
      WHERE
        culinary_id = ? AND is_deleted = FALSE;
    `,
      [id]
    );

    const culinaryFacilities = await query(
      `
      SELECT
        f.facility_id, f.name
      FROM
        culinary_has_facilities chf
      JOIN
        facilities f ON chf.facility_id = f.id
      WHERE
        chf.culinary_id = ? AND chf.is_deleted = FALSE;
    `,
      [id]
    );

    const reviews = await query(
      `
      SELECT
        cr.rating,
        cr.content,
        u.fullname
      FROM
        culinary_has_reviews cr
      JOIN
        users u ON cr.user_id = u.id
      WHERE
        cr.culinary_id = ? AND cr.is_deleted = FALSE;
    `,
      [id]
    );

    const formattedCulinaryDetails = {
      id: culinaryDetails[0].id,
      title: culinaryDetails[0].title,
      slug: culinaryDetails[0].slug,
      categories: culinaryDetails[0].categories,
      price: culinaryDetails[0].price,
      address: culinaryDetails[0].address,
      address_link: culinaryDetails[0].address_link,
      description: culinaryDetails[0].description,
      ticket_operasional: culinaryDetails[0].ticket_operasional,
      created_at: culinaryDetails[0].created_at,
      updated_at: culinaryDetails[0].updated_at,
      average_rating: culinaryDetails[0].average_rating || 0,
      images: culinaryImages,
      facilities: culinaryFacilities,
      reviews,
    };

    res.status(200).json({
      success: true,
      message: "Success",
      data: formattedCulinaryDetails,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
    throw new Error("Failed to fetch culinary data!");
  }
});

const getCulinaryBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  try {
    const culinaryDetails = await query(
      `
      SELECT
        c.id,
        c.title,
        c.slug,
        c.categories,
        c.price,
        c.address,
        c.address_link,
        c.description,
        c.ticket_operasional,
        c.created_at,
        c.updated_at,
        COALESCE(AVG(cr.rating), 0) AS average_rating
      FROM
        culinaries c
      LEFT JOIN
        culinary_has_reviews cr ON c.id = cr.culinary_id AND cr.is_deleted = FALSE
      WHERE
        c.slug = ?
        AND c.is_deleted = FALSE
      GROUP BY
        c.id;
    `,
      [slug]
    );

    if (culinaryDetails.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Culinary not found or has been deleted!",
      });
    }

    const culinaryImages = await query(
      `
      SELECT
        id,
        img_path
      FROM
        culinary_images
      WHERE
        culinary_id = ? AND is_deleted = FALSE;
    `,
      [culinaryDetails[0].id]
    );

    const culinaryFacilities = await query(
      `
      SELECT
        chf.facility_id, f.name
      FROM
        culinary_has_facilities chf
      JOIN
        facilities f ON chf.facility_id = f.id
      WHERE
        chf.culinary_id = ? AND chf.is_deleted = FALSE;
    `,
      [culinaryDetails[0].id]
    );

    const reviews = await query(
      `
      SELECT
        cr.rating,
        cr.content,
        u.fullname
      FROM
        culinary_has_reviews cr
      JOIN
        users u ON cr.user_id = u.id
      WHERE
        cr.culinary_id = ? AND cr.is_deleted = FALSE;
    `,
      [culinaryDetails[0].id]
    );

    const formattedCulinaryDetails = {
      id: culinaryDetails[0].id,
      title: culinaryDetails[0].title,
      slug: culinaryDetails[0].slug,
      categories: culinaryDetails[0].categories,
      price: culinaryDetails[0].price,
      address: culinaryDetails[0].address,
      address_link: culinaryDetails[0].address_link,
      description: culinaryDetails[0].description,
      ticket_operasional: culinaryDetails[0].ticket_operasional,
      created_at: culinaryDetails[0].created_at,
      updated_at: culinaryDetails[0].updated_at,
      average_rating: culinaryDetails[0].average_rating || 0,
      images: culinaryImages,
      facilities: culinaryFacilities,
      reviews,
    };

    res.status(200).json({
      success: true,
      message: "Success",
      data: formattedCulinaryDetails,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
    throw new Error("Failed to fetch culinary data!");
  }
});

// IMAGE UPLOADS
// IMAGE UPLOAD
const uploadCulinaryImage = asyncHandler(async (req, res) => {
  let imagePaths;
  const { id } = req.params;
  console.log(req.files);
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Silahkan upload gambar!",
      });
    }

    if (req.files.some((file) => !file.fieldname)) {
      return res.status(400).json({
        success: false,
        message: "File tidak didukung!",
      });
    }

    if (!id || id === null) {
      return res.status(400).json({
        success: false,
        message: "Tidak ada ID!",
      });
    }

    imagePaths = req.files.map((file) =>
      path.join("/public/images/", `${file.filename}`)
    );

    const allImages = await Promise.all(
      imagePaths.map(async (image) => {
        try {
          const data = await query(
            `INSERT INTO culinary_images (id_uuid, culinary_id, img_path) VALUES (?, ?, ?)`,
            [uuidv4(), id, image]
          );

          return data;
        } catch (insertError) {
          console.error(
            `Error inserting image into the database: ${insertError.message}`
          );
          throw insertError;
        }
      })
    );

    if (allImages.every((data) => data.length > 0)) {
      return res.json({
        success: true,
        message: "Gambar ditambahkan!",
      });
    } else {
      await Promise.all(
        imagePaths.map(async (imagePath) => {
          try {
            await fs.unlink(imagePath);
            console.log(`File ${imagePath} deleted successfully.`);
          } catch (deleteError) {
            console.error(
              `Error deleting file ${imagePath}: ${deleteError.message}`
            );
          }
        })
      );

      return res.json({
        success: false,
        message: "Gambar penginapan gagal ditambahkan!",
      });
    }
  } catch (error) {
    console.error(`Error handling image upload: ${error.message}`);

    await Promise.all(
      imagePaths.map(async (imagePath) => {
        try {
          await fs.unlink(imagePath);
          console.log(`File ${imagePath} deleted successfully.`);
        } catch (deleteError) {
          console.error(
            `Error deleting file ${imagePath}: ${deleteError.message}`
          );
        }
      })
    );

    res.json({
      success: false,
      message: "Gambar gagal ditambahkan!",
    });

    throw new Error("Gambar gagal ditambahkan!");
  }
});

// Update Culinary Image
const updateImage = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || id === null) {
      return res.status(400).json({
        success: false,
        message: "Tidak ada ID!",
      });
    }

    // Delete old images associated with the tour ID
    const oldImages = await query(
      `SELECT img_path FROM culinary_images WHERE culinary_id = ?`,
      [id]
    );

    await Promise.all(
      oldImages.map(async (oldImage) => {
        const fullPath = path.join(__dirname, "public", oldImage.img_path);
        try {
          await fs.unlink(fullPath);
          console.log(`Old image ${fullPath} deleted successfully.`);
        } catch (deleteError) {
          console.error(
            `Error deleting old image ${fullPath}: ${deleteError.message}`
          );
        }
      })
    );

    // Access the file details using req.files
    const newImagePaths = req.files.map((file) =>
      path.join("/public/images/", `${file.filename}`)
    );

    //  delete old images from db
    await query(`DELETE FROM culinary_images WHERE culinary_id = ?`, [id]);

    // Your logic to save data in the database
    const allImages = await Promise.all(
      newImagePaths.map(async (image) => {
        try {
          const data = await query(
            `INSERT INTO culinary_images (id_uuid, culinary_id, img_path) VALUES (?, ?, ?)`,
            [uuidv4(), id, image]
          );
          return data;
        } catch (insertError) {
          console.error(
            `Error inserting new image into the database: ${insertError.message}`
          );
          throw insertError;
        }
      })
    );

    if (allImages.every((data) => data.length > 0)) {
      return res.json({
        success: true,
        message: "Gambar penginapan diperbarui!",
      });
    } else {
      // Rollback: Delete all newly uploaded images
      await Promise.all(
        newImagePaths.map(async (newImagePath) => {
          try {
            await fs.unlink(newImagePath);
            console.log(
              `Newly uploaded image ${newImagePath} deleted successfully.`
            );
          } catch (deleteError) {
            console.error(
              `Error deleting newly uploaded image ${newImagePath}: ${deleteError.message}`
            );
          }
        })
      );

      return res.json({
        success: false,
        message: "Gambar gagal diperbarui!",
      });
    }
  } catch (error) {
    console.error(`Error handling image update: ${error.message}`);

    // Rollback: Delete all newly uploaded images
    await Promise.all(
      newImagePaths.map(async (newImagePath) => {
        try {
          await fs.unlink(newImagePath);
          console.log(
            `Newly uploaded image ${newImagePath} deleted successfully.`
          );
        } catch (deleteError) {
          console.error(
            `Error deleting newly uploaded image ${newImagePath}: ${deleteError.message}`
          );
        }
      })
    );

    res.json({
      success: false,
      message: "Gambar gagal diperbarui!",
    });

    throw new Error("Gambar gagal diperbarui!");
  }
});

// FASILITAS UNTUK PAKET KULINER
const getAllFacilities = asyncHandler(async (req, res) => {
  try {
    const data = await query(
      `SELECT id,name FROM facilities WHERE is_deleted = false`
    );
    res.json({
      success: true,
      message: "ok",
      data: { facilities: data },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
    throw new Error("Eror saat mengambil semua data fasilitas kuliner!");
  }
});

// TOUR CULINARY POST AND PUT (CREATE AND UPDATE)
const addCulinaryFacility = asyncHandler(async (req, res) => {
  const { facilities } = req.body;
  const { id } = req.params;

  if (
    !facilities ||
    !Array.isArray(facilities) ||
    facilities.length === 0 ||
    !id
  ) {
    return res.status(400).json({
      success: false,
      message: "Silahkan pilih fasilitas dengan benar!",
    });
  }

  try {
    const facilityInsertPromises = facilities.map(async (facility) => {
      const data = await query(
        `INSERT INTO culinary_has_facilities (culinary_id, facility_id) VALUES (?, ?)`,
        [id, facility]
      );

      return data;
    });

    const insertedData = await Promise.all(facilityInsertPromises);

    if (insertedData.every((data) => data.length > 0)) {
      return res.json({
        success: true,
        message: "Fasilitas kuliner ditambahkan!",
      });
    } else {
      return res.json({
        success: false,
        message: "Fasilitas kuliner gagal ditambahkan!",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
    throw new Error("Error saat menyimpan data fasilitas kuliner!");
  }
});

const updateCulinaryFacility = asyncHandler(async (req, res) => {
  const { facilities } = req.body;
  const { id } = req.params;

  if (
    !facilities ||
    !Array.isArray(facilities) ||
    facilities.length === 0 ||
    !id
  ) {
    return res.status(400).json({
      success: false,
      message: "Silahkan pilih fasilitas dengan benar!",
    });
  }

  try {
    // Delete existing entries for the given id
    await query(
      `DELETE FROM culinary_has_facilities WHERE tour_packet_id = ?`,
      [id]
    );

    // Insert new facilities
    const facilityInsertPromises = facilities.map(async (facility) => {
      const data = await query(
        `INSERT INTO culinary_has_facilities (culinary_id, facility_id) VALUES (?, ?)`,
        [id, facility]
      );

      return data;
    });

    const insertedData = await Promise.all(facilityInsertPromises);

    if (insertedData.every((data) => data.length > 0)) {
      return res.json({
        success: true,
        message: "Fasilitas kuliner diperbarui!",
      });
    } else {
      return res.json({
        success: false,
        message: "Fasilitas kuliner gagal diperbarui!",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
    throw new Error("Error saat mengubah data fasilitas kuliner!");
  }
});

const getAll = asyncHandler(async (req, res) => {
  try {
    const dataAll = await query(`SELECT
    c.id,
    c.title,
    c.slug,
    c.categories,
    c.price,
    c.address,
    c.address_link,
    c.description,
    c.ticket_operasional,
    c.created_at,
    COALESCE(AVG(cr.rating), 0) AS average_rating,
    MIN(ci.img_path) AS image
  FROM
    culinaries c
  LEFT JOIN
    culinary_has_reviews cr ON c.id = cr.culinary_id AND cr.is_deleted = FALSE
  LEFT JOIN (
    SELECT
      culinary_id,
      MIN(img_path) AS img_path
    FROM
      culinary_images
    GROUP BY
      culinary_id
  ) ci ON c.id = ci.culinary_id
  WHERE
    c.is_deleted = FALSE
  GROUP BY
    c.id;
  `);

    //Replace backslashes with forward slashes in image paths
    const processedData = dataAll.map((item) => {
      return {
        ...item,
        image: item.image.replace(/\\/g, '/'),
      };
    });

    // if (dataAll.length === 0) {
    //   return res.json({
    //     message: "Not FOund",
    //     success: true,
    //     data: dataAll,
    //   });
    // }
    return res.json({
      message: "ok",
      success: true,
      data: dataAll,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      data: dataAll,
    });
  }
});

module.exports = {
  createCulinary,
  updateCulinary,
  deleteCulinary,
  getAllCulinaries,
  getOneCulinary,
  updateImage,
  getAllFacilities,
  addCulinaryFacility,
  updateCulinaryFacility,
  getCulinaryBySlug,
  uploadCulinaryImage,
  getAll,
};
