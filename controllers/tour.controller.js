const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const { query, db } = require("../config/database");
const toDatetime = require("../utils/datetime");
const generateSlug = require("../utils/generateSlug");
const fs = require("fs/promises");

// TOUR
const getCreateTour = asyncHandler(async (req, res) => {
  console.log(req);
  res.json({ success: true, message: "Ok" });
});

const createTour = asyncHandler(async (req, res) => {
  console.log(req.body);
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

  console.log(parseInt(price[1]));
  try {
    const [checkslug] = await db.query(
      "SELECT slug FROM tours where slug = ?",
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
      `INSERT INTO tours (title, slug, categories, price, address, address_link, description, ticket_operasional, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        formatSlug,
        categories,
        parseInt(price[1]),
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
        message: "Wisata gagal dibuat!",
        data: "",
      });
    }

    res.json({
      success: true,
      message: "Wisata telah dibuat!",
      data: "",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error!" });
    throw new Error("Error saat menyimpan data wisata!");
  }
  res.json({ success: true, message: "Ok" });
});

const updateTour = asyncHandler(async (req, res) => {
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
    // Check if the given slug exists in the database
    const checkSlug = await query(
      "SELECT slug FROM tours WHERE slug = ? AND id != ?",
      [formatSlug, req.params.id]
    );
    console.log(checkSlug);
    if (checkSlug.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Slug sudah dipakai, silahkan ganti!",
      });
    }

    // Update the tour packet based on the provided ID
    // const parsedPrice = Array.isArray(price) ? parseInt(price[1]) : null;
    const newDatetime = toDatetime(Date.now());
    const data = await query(
      `UPDATE tours SET 
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
        price,
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
        message: "Wisata tidak ditemukan!",
      });
    }

    return res.json({
      success: true,
      message: "Wisata berhasil diperbarui!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
    throw new Error("Error saat mengubah data wisata");
  }
});

const deleteTour = asyncHandler(async (req, res) => {
  try {
    // Update the tour packet by setting is_deleted to true
    const newDatetime = toDatetime(Date.now());
    const data = await query(
      `UPDATE tours SET is_deleted = true, updated_at = ? WHERE id = ?`,
      [newDatetime, req.params.id]
    );

    if (!data.affectedRows) {
      return res.json({
        success: false,
        message: "Wisata tidak ditemukan!",
      });
    }

    return res.json({
      success: true,
      message: "Wisata berhasil dihapus!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
    throw new Error("Error saat menghapus wisata");
  }
});

const getAllTours = asyncHandler(async (req, res) => {
  try {
    // Fetch tour details
    const tourDetails = await query(
      `
      SELECT
        t.id,
        t.title,
        t.slug,
        t.categories,
        t.price,
        t.address,
        t.address_link,
        t.description,
        t.ticket_operasional,
        t.created_at,
        t.updated_at,
        COALESCE(AVG(tr.rating), 0) AS average_rating
      FROM
        tours t
      LEFT JOIN
        tour_has_reviews tr ON t.id = tr.tour_id AND tr.is_deleted = FALSE
      WHERE t.is_deleted = FALSE
      GROUP BY
        t.id;
    `
    );

    if (tourDetails.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Tour not found or has been deleted!",
      });
    }

    // Fetch tour images
    const tourImages = await query(
      `
      SELECT
      tour_id,
        id,
        img_path
      FROM
        tour_images
      WHERE
        is_deleted = FALSE;
    `
    );

    // Fetch tour facilities
    const tourFacilities = await query(
      `
      SELECT
        thf.tour_id, thf.facility_id, f.name
      FROM
        tour_has_facilities thf
      JOIN
        facilities f ON thf.facility_id = f.id
      WHERE
        thf.is_deleted = FALSE;
    `
    );

    // Fetch reviews with user fullname
    const reviews = await query(
      `
      SELECT
      tr.tour_id,
        tr.rating,
        tr.content,
        u.fullname
      FROM
        tour_has_reviews tr
      JOIN
        users u ON tr.user_id = u.id
      WHERE
        tr.is_deleted = FALSE;
    `
    );

    // Format the data for the client
    const formattedTourDetails = {
      tours: tourDetails,
      tour_images: tourImages,
      tour_facilities: tourFacilities,
      reviews: reviews,
    };

    res.status(200).json({
      success: true,
      message: "Success",
      data: formattedTourDetails,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
    throw new Error("Failed to fetch tour data!");
  }
});

const getOneTourBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  try {
    // Fetch tour details
    const tourDetails = await query(
      `
      SELECT
        t.id,
        t.title,
        t.slug,
        t.categories,
        t.price,
        t.address,
        t.address_link,
        t.description,
        t.ticket_operasional,
        t.created_at,
        t.updated_at,
        COALESCE(AVG(tr.rating), 0) AS average_rating
      FROM
        tours t
      LEFT JOIN
        tour_has_reviews tr ON t.id = tr.tour_id AND tr.is_deleted = FALSE
      WHERE
        t.slug = ?
        AND t.is_deleted = FALSE
      GROUP BY
        t.id;
    `,
      [slug]
    );

    if (tourDetails.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Tour not found or has been deleted!",
      });
    }

    // Fetch tour images
    const tourImages = await query(
      `
      SELECT
        id,
        img_path
      FROM
        tour_images
      WHERE
        tour_id = ? AND is_deleted = FALSE;
    `,
      [tourDetails[0].id]
    );
    console.log(tourDetails[0].id);
    // Fetch tour facilities
    const tourFacilities = await query(
      `
      SELECT
        thf.facility_id, f.name
      FROM
        tour_has_facilities thf
      JOIN
        facilities f ON thf.facility_id = f.id
      WHERE
        thf.tour_id = ? AND thf.is_deleted = FALSE;
    `,
      [tourDetails[0].id]
    );

    // Fetch reviews with user fullname
    const reviews = await query(
      `
      SELECT
        tr.rating,
        tr.content,
        u.fullname
      FROM
        tour_has_reviews tr
      JOIN
        users u ON tr.user_id = u.id
      WHERE
        tr.tour_id = ? AND tr.is_deleted = FALSE;
    `,
      [tourDetails[0].id]
    );

    // Format the data for the client
    const formattedTourDetails = {
      id: tourDetails[0].id,
      title: tourDetails[0].title,
      slug: tourDetails[0].slug,
      categories: tourDetails[0].categories,
      price: tourDetails[0].price,
      address: tourDetails[0].address,
      address_link: tourDetails[0].address_link,
      description: tourDetails[0].description,
      ticket_operasional: tourDetails[0].ticket_operasional,
      created_at: tourDetails[0].created_at,
      updated_at: tourDetails[0].updated_at,
      average_rating: tourDetails[0].average_rating || 0,
      images: tourImages,
      facilities: tourFacilities,
      reviews,
    };

    res.status(200).json({
      success: true,
      message: "Success",
      data: formattedTourDetails,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
    throw new Error("Failed to fetch tour data!");
  }
});

const getOneTour = asyncHandler(async (req, res) => {
  const { id } = req.params; // Assuming the ID is in the request parameters

  try {
    // Fetch tour details
    const tourDetails = await query(
      `
      SELECT
        t.id,
        t.title,
        t.slug,
        t.categories,
        t.price,
        t.address,
        t.address_link,
        t.description,
        t.ticket_operasional,
        t.created_at,
        t.updated_at,
        COALESCE(AVG(tr.rating), 0) AS average_rating
      FROM
        tours t
      LEFT JOIN
        tour_has_reviews tr ON t.id = tr.tour_id AND tr.is_deleted = FALSE
      WHERE
        t.id = ?
        AND t.is_deleted = FALSE
      GROUP BY
        t.id;
    `,
      [id]
    );

    if (tourDetails.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Tour not found or has been deleted!",
      });
    }

    // Fetch tour images
    const tourImages = await query(
      `
      SELECT
        id,
        img_path
      FROM
        tour_images
      WHERE
        tour_id = ? AND is_deleted = FALSE;
    `,
      [id]
    );

    // Fetch tour facilities
    const tourFacilities = await query(
      `
      SELECT
        f.facility_id, f.name
      FROM
        tour_has_facilities thf
      JOIN
        facilities f ON thf.facility_id = f.id
      WHERE
        thf.tour_id = ? AND thf.is_deleted = FALSE;
    `,
      [id]
    );

    // Fetch reviews with user fullname
    const reviews = await query(
      `
      SELECT
        tr.rating,
        tr.content,
        u.fullname
      FROM
        tour_has_reviews tr
      JOIN
        users u ON tr.user_id = u.id
      WHERE
        tr.tour_id = ? AND tr.is_deleted = FALSE;
    `,
      [id]
    );

    // Format the data for the client
    const formattedTourDetails = {
      id: tourDetails[0].id,
      title: tourDetails[0].title,
      slug: tourDetails[0].slug,
      categories: tourDetails[0].categories,
      price: tourDetails[0].price,
      address: tourDetails[0].address,
      address_link: tourDetails[0].address_link,
      description: tourDetails[0].description,
      ticket_operasional: tourDetails[0].ticket_operasional,
      created_at: tourDetails[0].created_at,
      updated_at: tourDetails[0].updated_at,
      average_rating: tourDetails[0].average_rating || 0,
      images: tourImages,
      facilities: tourFacilities,
      reviews,
    };

    res.status(200).json({
      success: true,
      message: "Success",
      data: formattedTourDetails,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
    throw new Error("Failed to fetch tour data!");
  }
});
// Use this route instead of the previous one

// IMAGE UPLOADS
const uploadImages = asyncHandler(async (req, res) => {
  let imagePaths;
  try {
    // Check if no files were uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Silahkan upload gambar!",
      });
    }

    // Check if any files were rejected
    if (req.files.some((file) => !file.fieldname)) {
      return res.status(400).json({
        success: false,
        message: "File tidak didukung!",
      });
    }

    const { id } = req.params;
    if (!id || id === null) {
      return res.status(400).json({
        success: false,
        message: "Tidak ada ID!",
      });
    }

    // Access the file details using req.files
    imagePaths = req.files.map((file) =>
      path.join("/public/images/", `${file.filename}`)
    );

    // Your logic to save data in the database
    const allImages = await Promise.all(
      imagePaths.map(async (image) => {
        try {
          const data = await query(
            `INSERT INTO tour_images (id_uuid, tour_id, img_path) VALUES (?, ?, ?)`,
            [uuidv4(), id, image]
          );

          return data;
        } catch (insertError) {
          console.error(
            `Error inserting image into the database: ${insertError.message}`
          );
          throw insertError; // Rethrow the error to trigger the catch block below
        }
      })
    );

    if (allImages.every((data) => data.length > 0)) {
      return res.json({
        success: true,
        message: "Gambar wisata ditambahkan!",
      });
    } else {
      // Rollback: Delete all images from server
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
        message: "Gambar wisata gagal ditambahkan!",
      });
    }
  } catch (error) {
    console.error(`Error handling image upload: ${error.message}`);

    // Rollback: Delete all images from server
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
      message: "Gambar wisata gagal ditambahkan!",
    });

    throw new Error("Gambar wisata gagal ditambahkan!");
  }
});

const updateImages = asyncHandler(async (req, res) => {
  let newImagePaths;
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
      `SELECT img_path FROM tour_packets_images WHERE tour_id = ?`,
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
    newImagePaths = req.files.map((file) =>
      path.join("/public/images/", `${file.filename}`)
    );
    // Delete old images from db
    await query(`DELETE FROM tour_images WHERE tour_id = ?`, [id]);

    // Your logic to save data in the database
    const allImages = await Promise.all(
      newImagePaths.map(async (image) => {
        try {
          const data = await query(
            `INSERT INTO tour_images (id_uuid, tour_id, img_path) VALUES (?, ?, ?)`,
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
        message: "Gambar paket wisata diperbarui!",
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
        message: "Gambar wisata gagal diperbarui!",
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
      message: "Gambar wisata gagal diperbarui!",
    });

    throw new Error("Gambar wisata gagal diperbarui!");
  }
});

// FASILITAS UNTUK PAKET WISATA, KULINER, PENGINAPAN DALAM PAKET WISATA
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
    throw new Error("Eror saat mengambil semua data fasilitas wisata!");
  }
});

// TOUR FACILITIES POST AND PUT (CREATE AND UPDATE)
const addTourFacility = asyncHandler(async (req, res) => {
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
        `INSERT INTO tour_has_facilities (tour_id, facility_id) VALUES (?, ?)`,
        [id, facility]
      );

      return data;
    });

    const insertedData = await Promise.all(facilityInsertPromises);

    if (insertedData.every((data) => data.length > 0)) {
      return res.json({
        success: true,
        message: "Fasilitas wisata ditambahkan!",
      });
    } else {
      return res.json({
        success: false,
        message: "Fasilitas wisata gagal ditambahkan!",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
    throw new Error("Error saat menyimpan data fasilitas wisata!");
  }
});

const updateTourFacility = asyncHandler(async (req, res) => {
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
    await query(`DELETE FROM tour_has_facilities WHERE tour_id = ?`, [id]);

    // Insert new facilities
    const facilityInsertPromises = facilities.map(async (facility) => {
      const data = await query(
        `INSERT INTO tour_has_facilities (tour_id, facility_id) VALUES (?, ?)`,
        [id, facility]
      );

      return data;
    });

    const insertedData = await Promise.all(facilityInsertPromises);

    if (insertedData.every((data) => data.length > 0)) {
      return res.json({
        success: true,
        message: "Fasilitas wisata diperbarui!",
      });
    } else {
      return res.json({
        success: false,
        message: "Fasilitas wisata gagal diperbarui!",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
    throw new Error("Error saat mengubah data fasilitas wisata!");
  }
});

const getAll = asyncHandler(async (req, res) => {
  try {
    const dataAll = await query(`SELECT
    t.id,
    t.title,
    t.slug,
    t.categories,
    t.price,
    t.address,
    t.address_link,
    t.description,
    t.ticket_operasional,
    t.created_at,
    COALESCE(AVG(tr.rating), 0) AS average_rating,
    MIN(ti.img_path) AS image
  FROM
    tours t
  LEFT JOIN
    tour_has_reviews tr ON t.id = tr.tour_id AND tr.is_deleted = FALSE
  LEFT JOIN (
    SELECT
      tour_id,
      MIN(img_path) AS img_path
    FROM
      tour_images
    GROUP BY
      tour_id
  ) ti ON t.id = ti.tour_id
  WHERE
    t.is_deleted = FALSE
  GROUP BY
    t.id;
  `);

    // if (dataAll.length === 0) {
    //   return res.json({
    //     message: "not found",
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
    return res.json({
      message: "Internal Server Error",
      success: false,
    });
  }
});

const getThree = asyncHandler(async (req, res) => {
  try {
    const allData = await query(`
      SELECT
        tp.id,
        tp.title,
        tp.slug,
        tp.price,
        tp.address,
        tp.address_link,
        tp.description,
        tp.tour_description,
        tp.tour_link,
        tp.culinary_description,
        tp.culinary_link,
        tp.lodging_description,
        tp.lodging_link,
        tp.created_at,
        COALESCE(AVG(tpr.rating), 0) AS average_rating,
        COUNT(tpr.id) AS review_count,
        MIN(tpi.img_path) AS image
      FROM
        tour_packets tp
      LEFT JOIN
        tour_packet_has_reviews tpr ON tp.id = tpr.tour_packet_id AND tpr.is_deleted = FALSE
      LEFT JOIN (
        SELECT
          tour_packet_id,
          MIN(img_path) AS img_path
        FROM
          tour_packets_images
        GROUP BY
          tour_packet_id
      ) tpi ON tp.id = tpi.tour_packet_id
      WHERE
        tp.is_deleted = FALSE
      GROUP BY
        tp.id
      ORDER BY
        tp.id DESC
      LIMIT 3;
    `);

    // Replace backslashes with forward slashes in image paths
    const processedData = allData.map((item) => {
      return {
        ...item,
        image: item.image.replace(/\\/g, '/'),
      };
    });

    // Check if data is empty
    if (processedData.length === 0) {
      return res.json({
        message: "Not Found",
        data: processedData,
        success: true,
      });
    }

    // Respond with the data
    return res.json({
      message: "ok",
      data: processedData,
      success: true,
    });
  } catch (error) {
    console.log(error);
    // Handle error without referencing processedData
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
});


module.exports = {
  getCreateTour,
  createTour,
  updateTour,
  deleteTour,
  getOneTour,
  getAllTours,
  uploadImages,
  updateImages,
  getAllFacilities,
  addTourFacility,
  updateTourFacility,
  getOneTourBySlug,
  getAll,
  getThree,
};
