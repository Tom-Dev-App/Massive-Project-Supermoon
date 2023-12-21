const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const { query, db } = require("../config/database");
const toDatetime = require("../utils/datetime");
const generateSlug = require("../utils/generateSlug");
const fs = require("fs/promises");

// LODGING
const createLodging = asyncHandler(async (req, res) => {
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
      "SELECT slug FROM lodgings where slug = ?",
      [slug]
    );
    console.log(checkslug);
    if (checkslug.length > 1) {
      return res.status(400).json({
        success: false,
        message: "Slug sudah dipakai, silahkan ganti!",
      });
    }

    let newDatetime = toDatetime(Date.now());
    const data = await query(
      `INSERT INTO lodgings (title, slug, categories, price, address, address_link, description, ticket_operasional, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
      return res.json({
        success: false,
        message: "Penginapan gagal dibuat!",
        data: "",
      });
    }

    return res.json({
      success: true,
      message: "Penginapan telah dibuat!",
      data: "",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error!" });
    throw new Error("Error saat menyimpan data akomodasi!");
  }
});

const updateLodging = asyncHandler(async (req, res) => {
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
      "SELECT slug FROM lodgings WHERE slug = ? AND id != ?",
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
      `UPDATE lodgings SET 
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
        message: "Penginapan tidak ditemukan!",
      });
    }

    return res.json({
      success: true,
      message: "Penginapan berhasil diperbarui!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error!" });
    throw new Error("Error saat mengubah data akomodasi!");
  }
});

const deleteLodging = asyncHandler(async (req, res) => {
  try {
    const newDatetime = toDatetime(Date.now());
    const data = await query(
      `UPDATE lodgings SET is_deleted = true, updated_at = ? WHERE id = ?`,
      [newDatetime, req.params.id]
    );

    if (!data.affectedRows) {
      return res.json({
        success: false,
        message: "Penginapan tidak ditemukan!",
        data: [],
      });
    }

    return res.json({
      success: true,
      message: "Penginapan berhasil dihapus!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error!" });
    throw new Error("Error saat menghapus Penginapan!");
  }
});

const getAllLodgings = asyncHandler(async (req, res) => {
  try {
    const lodgingDetails = await query(`
      SELECT
        l.id,
        l.title,
        l.slug,
        l.categories,
        l.price,
        l.address,
        l.address_link,
        l.description,
        l.ticket_operasional,
        l.created_at,
        l.updated_at,
        COALESCE(AVG(lr.rating), 0) AS average_rating
      FROM
        lodgings l
      LEFT JOIN
        lodging_has_reviews lr ON l.id = lr.lodging_id AND lr.is_deleted = FALSE
      WHERE l.is_deleted = FALSE
      GROUP BY
        l.id;
    `);

    if (lodgingDetails.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Penginapan not found or has been deleted!",
      });
    }

    const lodgingImages = await query(`
      SELECT
        lodging_id,
        id,
        img_path
      FROM
        lodging_images
      WHERE
        is_deleted = FALSE;
    `);

    const lodgingFacilities = await query(`
      SELECT
        lhf.lodging_id, lhf.facility_id, f.name
      FROM
        lodging_has_facilities lhf
      JOIN
        facilities f ON lhf.facility_id = f.id
      WHERE
        lhf.is_deleted = FALSE;
    `);

    const reviews = await query(`
      SELECT
        lr.lodging_id,
        lr.rating,
        lr.content,
        u.fullname
      FROM
        lodging_has_reviews lr
      JOIN
        users u ON lr.user_id = u.id
      WHERE
        lr.is_deleted = FALSE;
    `);

    const formattedLodgingDetails = {
      lodgings: lodgingDetails,
      lodging_images: lodgingImages,
      lodging_facilities: lodgingFacilities,
      reviews: reviews,
    };

    res.status(200).json({
      success: true,
      message: "Success",
      data: formattedLodgingDetails,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
    throw new Error("Failed to fetch lodging data!");
  }
});

const getOneLodging = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const lodgingDetails = await query(
      `
      SELECT
        l.id,
        l.title,
        l.slug,
        l.categories,
        l.price,
        l.address,
        l.address_link,
        l.description,
        l.ticket_operasional,
        l.created_at,
        l.updated_at,
        COALESCE(AVG(lr.rating), 0) AS average_rating
      FROM
        lodgings l
      LEFT JOIN
        lodging_has_reviews lr ON l.id = lr.lodging_id AND lr.is_deleted = FALSE
      WHERE
        l.id = ?
        AND l.is_deleted = FALSE
      GROUP BY
        l.id;
    `,
      [id]
    );

    if (lodgingDetails.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Penginapan not found or has been deleted!",
      });
    }

    const lodgingImages = await query(
      `
      SELECT
        id,
        img_path
      FROM
        lodging_images
      WHERE
        lodging_id = ? AND is_deleted = FALSE;
    `,
      [id]
    );

    const lodgingFacilities = await query(
      `
      SELECT
        f.facility_id, f.name
      FROM
        lodging_has_facilities lhf
      JOIN
        facilities f ON lhf.facility_id = f.id
      WHERE
        lhf.lodging_id = ? AND lhf.is_deleted = FALSE;
    `,
      [id]
    );

    const reviews = await query(
      `
      SELECT
        lr.rating,
        lr.content,
        u.fullname
      FROM
        lodging_has_reviews lr
      JOIN
        users u ON lr.user_id = u.id
      WHERE
        lr.lodging_id = ? AND lr.is_deleted = FALSE;
    `,
      [id]
    );

    const formattedLodgingDetails = {
      id: lodgingDetails[0].id,
      title: lodgingDetails[0].title,
      slug: lodgingDetails[0].slug,
      categories: lodgingDetails[0].categories,
      price: lodgingDetails[0].price,
      address: lodgingDetails[0].address,
      address_link: lodgingDetails[0].address_link,
      description: lodgingDetails[0].description,
      ticket_operasional: lodgingDetails[0].ticket_operasional,
      created_at: lodgingDetails[0].created_at,
      updated_at: lodgingDetails[0].updated_at,
      average_rating: lodgingDetails[0].average_rating || 0,
      images: lodgingImages,
      facilities: lodgingFacilities,
      reviews,
    };

    res.status(200).json({
      success: true,
      message: "Success",
      data: formattedLodgingDetails,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
    throw new Error("Failed to fetch lodging data!");
  }
});

const getOneLodgingBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  try {
    const lodgingDetails = await query(
      `
      SELECT
        l.id,
        l.title,
        l.slug,
        l.categories,
        l.price,
        l.address,
        l.address_link,
        l.description,
        l.ticket_operasional,
        l.created_at,
        l.updated_at,
        COALESCE(AVG(lr.rating), 0) AS average_rating
      FROM
        lodgings l
      LEFT JOIN
        lodging_has_reviews lr ON l.id = lr.lodging_id AND lr.is_deleted = FALSE
      WHERE
        l.slug = ?
        AND l.is_deleted = FALSE
      GROUP BY
        l.id;
    `,
      [slug]
    );

    if (lodgingDetails.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Penginapan not found or has been deleted!",
      });
    }

    const lodgingImages = await query(
      `
      SELECT
        id,
        img_path
      FROM
        lodging_images
      WHERE
        lodging_id = ? AND is_deleted = FALSE;
    `,
      [lodgingDetails[0].id]
    );

    const lodgingFacilities = await query(
      `
      SELECT
        lhf.facility_id, f.name
      FROM
        lodging_has_facilities lhf
      JOIN
        facilities f ON lhf.facility_id = f.id
      WHERE
        lhf.lodging_id = ? AND lhf.is_deleted = FALSE;
    `,
      [lodgingDetails[0].id]
    );

    const reviews = await query(
      `
      SELECT
        lr.rating,
        lr.content,
        u.fullname
      FROM
        lodging_has_reviews lr
      JOIN
        users u ON lr.user_id = u.id
      WHERE
        lr.lodging_id = ? AND lr.is_deleted = FALSE;
    `,
      [lodgingDetails[0].id]
    );

    const formattedLodgingDetails = {
      id: lodgingDetails[0].id,
      title: lodgingDetails[0].title,
      slug: lodgingDetails[0].slug,
      categories: lodgingDetails[0].categories,
      price: lodgingDetails[0].price,
      address: lodgingDetails[0].address,
      address_link: lodgingDetails[0].address_link,
      description: lodgingDetails[0].description,
      ticket_operasional: lodgingDetails[0].ticket_operasional,
      created_at: lodgingDetails[0].created_at,
      updated_at: lodgingDetails[0].updated_at,
      average_rating: lodgingDetails[0].average_rating || 0,
      images: lodgingImages,
      facilities: lodgingFacilities,
      reviews,
    };

    res.status(200).json({
      success: true,
      message: "Success",
      data: formattedLodgingDetails,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
    throw new Error("Failed to fetch lodging data!");
  }
});

// IMAGE UPLOADS
const uploadLodgingImages = asyncHandler(async (req, res) => {
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
            `INSERT INTO lodging_images (id_uuid, lodging_id, img_path) VALUES (?, ?, ?)`,
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
        message: "Gambar penginapan ditambahkan!",
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
      message: "Gambar penginapan gagal ditambahkan!",
    });

    throw new Error("Gambar penginapan gagal ditambahkan!");
  }
});

const updateLodgingImages = asyncHandler(async (req, res) => {
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
      `SELECT img_path FROM lodging_images WHERE lodging_id = ?`,
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
    await query(`DELETE FROM lodging_images WHERE lodging_id = ?`, [id]);

    // Your logic to save data in the database
    const allImages = await Promise.all(
      newImagePaths.map(async (image) => {
        try {
          const data = await query(
            `INSERT INTO lodging_images (id_uuid, lodging_id, img_path) VALUES (?, ?, ?)`,
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
        message: "Gambar penginapan gagal diperbarui!",
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
      message: "Gambar penginapan gagal diperbarui!",
    });

    throw new Error("Gambar penginapan gagal diperbarui!");
  }
});

// FASILITAS UNTUK
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
    throw new Error("Eror saat mengambil semua data fasilitas akomodasi!");
  }
});

// LODGING FACILITY POST AND PUT (CREATE AND UPDATE)
const addLodgingFacility = asyncHandler(async (req, res) => {
  const { facilities } = req.body;
  const { id } = req.params;
  console.log(req.body);
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
        `INSERT INTO lodging_has_facilities (lodging_id, facility_id) VALUES (?, ?)`,
        [id, facility]
      );

      return data;
    });

    const insertedData = await Promise.all(facilityInsertPromises);

    if (insertedData.every((data) => data.length > 0)) {
      return res.json({
        success: true,
        message: "Fasilitas penginapan ditambahkan!",
      });
    } else {
      return res.json({
        success: false,
        message: "Fasilitas penginapan gagal ditambahkan!",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
    throw new Error("Error saat menyimpan data fasilitas penginapan!");
  }
});

const updateLodgingFacility = asyncHandler(async (req, res) => {
  console.log(req.body);

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
    await query(`DELETE FROM lodging_has_facilities WHERE lodging_id = ?`, [
      id,
    ]);

    // Insert new facilities
    const facilityInsertPromises = facilities.map(async (facility) => {
      const data = await query(
        `INSERT INTO lodging_has_facilities (lodging_id, facility_id) VALUES (?, ?)`,
        [id, facility]
      );

      return data;
    });

    const insertedData = await Promise.all(facilityInsertPromises);

    if (insertedData.every((data) => data.length > 0)) {
      return res.json({
        success: true,
        message: "Fasilitas penginapan diperbarui!",
      });
    } else {
      return res.json({
        success: false,
        message: "Fasilitas penginapan gagal diperbarui!",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
    throw new Error("Error saat mengubah data fasilitas penginapan!");
  }
});

const getAll = asyncHandler(async (req, res) => {
  try {
    const dataAll = await query(`SELECT
  l.id,
  l.title,
  l.slug,
  l.categories,
  l.price,
  l.address,
  l.address_link,
  l.description,
  l.ticket_operasional,
  l.created_at,
  COALESCE(AVG(lr.rating), 0) AS average_rating,
  MIN(li.img_path) AS image
FROM
  lodgings l
LEFT JOIN
  lodging_has_reviews lr ON l.id = lr.lodging_id AND lr.is_deleted = FALSE
LEFT JOIN (
  SELECT
    lodging_id,
    MIN(img_path) AS img_path
  FROM
    lodging_images
  GROUP BY
    lodging_id
) li ON l.id = li.lodging_id
WHERE
  l.is_deleted = FALSE
GROUP BY
  l.id;
`);

      
    //Replace backslashes with forward slashes in image paths
    const processedData = dataAll.map((item) => {
      return {
        ...item,
        image: item.image.replace(/\\/g, '/'),
      };
    });

    // if (dataAll.length === 0) {
    //   return res.status(404).json({
    //     message: "Not FOund",
    //     success: true,
    //     data: dataAll,
    //   });
    // }
    return res.status(200).json({
      message: "ok",
      success: true,
      data: dataAll,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
});

module.exports = {
  createLodging,
  updateLodging,
  deleteLodging,
  getAllLodgings,
  getOneLodging,
  uploadLodgingImages,
  updateLodgingImages,
  getAllFacilities,
  addLodgingFacility,
  updateLodgingFacility,
  getOneLodgingBySlug,
  getAll,
};
