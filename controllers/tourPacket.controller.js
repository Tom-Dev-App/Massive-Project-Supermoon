const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const { query, db } = require("../config/database");
const toDatetime = require("../utils/datetime");
const generateSlug = require("../utils/generateSlug");
const fs = require("fs/promises");

// TOUR PACKET
const getCreateTourPacket = asyncHandler(async (req, res) => {
  console.log(req);
  res.json({ success: true, message: "Ok" });
});

const createTourPacket = asyncHandler(async (req, res) => {
  console.log(req.body);
  const {
    title,
    slug,
    price,
    address,
    address_link,
    description,
    tour_description,
    tour_link,
    culinary_description,
    culinary_link,
    lodging_description,
    lodging_link,
  } = req.body;
  const formatSlug = generateSlug(slug);

  console.log(parseInt(price[1]));
  try {
    const [rows] = await db.query(
      "SELECT slug FROM tour_packets where slug = ?",
      [slug]
    );

    if (rows.length > 1) {
      return res.status(400).json({
        success: false,
        message: "Slug sudah dipakai, silahkan ganti!",
      });
    }

    let newDatetime = toDatetime(Date.now());
    const data = await query(
      `INSERT INTO tour_packets (title, slug, price, address, address_link, description, tour_description, tour_link, culinary_description, culinary_link, lodging_description, lodging_link, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        formatSlug,
        parseInt(price[1]),
        address,
        address_link,
        description,
        tour_description,
        tour_link,
        culinary_description,
        culinary_link,
        lodging_description,
        lodging_link,
        newDatetime,
        newDatetime,
      ]
    );

    res.json({
      success: true,
      message: "Paket wisata telah dibuat!",
      data: "",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error!" });
    throw new Error("Error saat menyimpan data paket wisata!");
  }
});

const updateTourPacket = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({
      success: false,
      message: "Tidak ada ID",
    });
  }

  // return console.log(req.body);
  const {
    title,
    slug,
    price,
    address,
    address_link,
    description,
    tour_description,
    tour_link,
    culinary_description,
    culinary_link,
    lodging_description,
    lodging_link,
  } = req.body;

  const formatSlug = generateSlug(slug);

  try {
    // Check if the given slug exists in the database
    const checkSlug = await db.query(
      "SELECT slug FROM tour_packets WHERE slug = ? AND id != ?",
      [formatSlug, req.params.id]
    );

    if (checkSlug.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Slug sudah dipakai, silahkan ganti!",
      });
    }

    // Parse the price value only if it exists and is in the expected format
    const parsedPrice = Array.isArray(price) ? parseInt(price[1]) : null;

    // Update the tour packet based on the provided ID
    const newDatetime = toDatetime(Date.now());
    const data = await query(
      `UPDATE tour_packets SET 
        title = ?, 
        slug = ?, 
        price = ?, 
        address = ?, 
        address_link = ?, 
        description = ?, 
        tour_description = ?, 
        tour_link = ?, 
        culinary_description = ?, 
        culinary_link = ?, 
        lodging_description = ?, 
        lodging_link = ?, 
        updated_at = ? 
        WHERE id = ?`,
      [
        title,
        formatSlug,
        parsedPrice, // Use the parsed price here
        address,
        address_link,
        description,
        tour_description,
        tour_link,
        culinary_description,
        culinary_link,
        lodging_description,
        lodging_link,
        newDatetime,
        req.params.id,
      ]
    );

    if (!data.affectedRows) {
      return res.json({
        success: false,
        message: "Paket wisata tidak ditemukan!",
      });
    }

    return res.json({
      success: true,
      message: "Paket wisata berhasil diperbarui!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
    throw new Error("Error saat mengubah data paket penginapan");
  }
});

const deleteTourPacket = asyncHandler(async (req, res) => {
  try {
    // Update the tour packet by setting is_deleted to true
    const newDatetime = toDatetime(Date.now());
    const data = await query(
      `UPDATE tour_packets SET is_deleted = true, updated_at = ? WHERE id = ?`,
      [newDatetime, req.params.id]
    );

    if (!data.affectedRows) {
      return res.json({
        success: false,
        message: "Paket wisata tidak ditemukan!",
      });
    }

    return res.json({
      success: true,
      message: "Paket wisata berhasil dihapus!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
    throw new Error("Error saat menghapus data paket penginapan");
  }
});

const getOneTourPacket = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    // Fetch tour packet details
    const tourPacketDetails = await query(
      `
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
  COALESCE(AVG(tpr.rating), 0) AS average_rating
FROM
  tour_packets tp
LEFT JOIN
  tour_packet_has_reviews tpr ON tp.id = tpr.tour_packet_id AND tpr.is_deleted = FALSE
WHERE
  tp.id = ? AND tp.is_deleted = FALSE;
    `,
      [id]
    );

    if (!tourPacketDetails[0]) {
      return res.status(404).json({
        success: false,
        message: "Tour packet not found or has been deleted!",
      });
    }

    const tourImages = await query(
      `SELECT
  id,
  id_uuid,
  tour_packet_id,
  img_path,
  created_at,
  updated_at
FROM
  tour_packets_images
WHERE
  tour_packet_id = ? AND is_deleted = FALSE;
`,
      [id]
    );

    // Fetch reviews
    const reviews = await query(
      `
      SELECT
  tpr.rating,
  tpr.content,
  u.fullname
FROM
  tour_packet_has_reviews tpr
JOIN
  users u ON tpr.user_id = u.id
WHERE
  tpr.tour_packet_id = 'id' AND tpr.is_deleted = FALSE;

    `,
      [id]
    );

    // Fetch tour facilities
    const tourFacilities = await query(
      `
      SELECT
        tptf.facility_id, tf.name
      FROM
        tour_packets_tour_facilities tptf
      JOIN
        facilities tf ON tptf.facility_id = tf.id
      WHERE
        tptf.tour_packet_id = ? AND tptf.is_deleted = FALSE
    `,
      [id]
    );

    // Fetch culinary facilities
    const culinaryFacilities = await query(
      `
      SELECT
        tpcf.facility_id, cf.name
      FROM
        tour_packets_culinary_facilities tpcf
      JOIN
        facilities cf ON tpcf.facility_id = cf.id
      WHERE
        tpcf.tour_packet_id = ? AND tpcf.is_deleted = FALSE
    `,
      [id]
    );

    // Fetch lodging facilities
    const lodgingFacilities = await query(
      `
      SELECT
        tplf.facility_id, lf.name
      FROM
        tour_packets_lodging_facilities tplf
      JOIN
        facilities lf ON tplf.facility_id = lf.id
      WHERE
        tplf.tour_packet_id = ? AND tplf.is_deleted = FALSE
    `,
      [id]
    );

    // Format the response
    const formattedResponse = {
      tour_packet: tourPacketDetails,
      tour_images: tourImages,
      tour_facilities: tourFacilities,
      culinary_facilities: culinaryFacilities,
      lodging_facilities: lodgingFacilities,
      reviews: reviews,
    };

    res.status(200).json({
      success: true,
      message: "Success",
      data: formattedResponse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
    throw new Error("Error fetching tour packet details!");
  }
});

const getOneTourPacketBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  try {
    // Fetch tour packet details by slug
    const tourPacketDetails = await query(
      `
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
  COALESCE(AVG(tpr.rating), 0) AS average_rating
FROM
  tour_packets tp
LEFT JOIN
  tour_packet_has_reviews tpr ON tp.id = tpr.tour_packet_id AND tpr.is_deleted = FALSE
WHERE
  tp.slug = ? AND tp.is_deleted = FALSE;

      `,
      [slug]
    );

    if (!tourPacketDetails[0]) {
      return res.status(404).json({
        success: false,
        message: "Tour packet not found or has been deleted!",
      });
    }

    // Fetch tour images
    const tourImages = await query(
      `
      SELECT
        id,
        id_uuid,
        tour_packet_id,
        img_path,
        created_at,
        updated_at
      FROM
        tour_packets_images
      WHERE
        tour_packet_id = ? AND is_deleted = FALSE;
      `,
      [tourPacketDetails[0].id]
    );

    // Fetch reviews
    const reviews = await query(
      `
      SELECT
  tpr.rating,
  tpr.content,
  u.fullname
FROM
  tour_packet_has_reviews tpr
JOIN
  users u ON tpr.user_id = u.id
WHERE
  tpr.tour_packet_id = ? AND tpr.is_deleted = FALSE;

    `,
      [tourPacketDetails[0].id]
    );

    // Fetch tour facilities
    const tourFacilities = await query(
      `
      SELECT
        tptf.facility_id, tf.name
      FROM
        tour_packets_tour_facilities tptf
      JOIN
        facilities tf ON tptf.facility_id = tf.id
      WHERE
        tptf.tour_packet_id = ? AND tptf.is_deleted = FALSE;
    `,
      [tourPacketDetails[0].id]
    );

    // Fetch culinary facilities
    const culinaryFacilities = await query(
      `
      SELECT
        tpcf.facility_id, cf.name
      FROM
        tour_packets_culinary_facilities tpcf
      JOIN
        facilities cf ON tpcf.facility_id = cf.id
      WHERE
        tpcf.tour_packet_id = ? AND tpcf.is_deleted = FALSE;
    `,
      [tourPacketDetails[0].id]
    );

    // Fetch lodging facilities
    const lodgingFacilities = await query(
      `
      SELECT
        tplf.facility_id, lf.name
      FROM
        tour_packets_lodging_facilities tplf
      JOIN
        facilities lf ON tplf.facility_id = lf.id
      WHERE
        tplf.tour_packet_id = ? AND tplf.is_deleted = FALSE;
    `,
      [tourPacketDetails[0].id]
    );

    // Format the response
    const formattedResponse = {
      tour_packet: tourPacketDetails[0],
      tour_images: tourImages,
      tour_facilities: tourFacilities,
      culinary_facilities: culinaryFacilities,
      lodging_facilities: lodgingFacilities,
      reviews: reviews,
    };

    res.status(200).json({
      success: true,
      message: "Success",
      data: formattedResponse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error!" });
    throw new Error("Error fetching tour packet details!");
  }
});

const getAllTourPacket = asyncHandler(async (req, res) => {
  try {
    // Fetch tour packet details
    const tourPacketDetails = await query(
      `
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
  COALESCE(AVG(tpr.rating), 0) AS average_rating
FROM
  tour_packets tp
LEFT JOIN
  tour_packet_has_reviews tpr ON tp.id = tpr.tour_packet_id AND tpr.is_deleted = FALSE
WHERE
 tp.is_deleted = FALSE
 GROUP BY tp.id;
    `
    );

    if (!tourPacketDetails[0]) {
      return res.status(404).json({
        success: false,
        message: "Tour packet not found or has been deleted!",
      });
    }

    const tourImages = await query(
      `SELECT
  id,
  id_uuid,
  tour_packet_id,
  img_path,
  created_at,
  updated_at
FROM
  tour_packets_images
WHERE
  is_deleted = FALSE;
`
    );

    // Fetch reviews
    const reviews = await query(
      `
      SELECT
      tour_packet_id,
        rating,
        content,
        user_id
      FROM
        tour_packet_has_reviews
      WHERE
        is_deleted = FALSE
    `
    );

    // Fetch tour facilities
    const tourFacilities = await query(
      `
        SELECT
          tptf.tour_packet_id, tf.name
        FROM
          tour_packets_tour_facilities tptf
        JOIN
          facilities tf ON tptf.facility_id = tf.id
        WHERE
          tptf.is_deleted = FALSE;
      `
    );

    // Fetch culinary facilities
    const culinaryFacilities = await query(
      `
      SELECT
        tpcf.tour_packet_id, cf.name
      FROM
        tour_packets_culinary_facilities tpcf
      JOIN
        facilities cf ON tpcf.facility_id = cf.id
      WHERE
        tpcf.is_deleted = FALSE
    `
    );

    // Fetch lodging facilities
    const lodgingFacilities = await query(
      `
      SELECT
        tplf.tour_packet_id, lf.name
      FROM
        tour_packets_lodging_facilities tplf
      JOIN
        facilities lf ON tplf.facility_id = lf.id
      WHERE
      tplf.is_deleted = FALSE
    `
    );

    // Format the response
    const formattedResponse = {
      tour_packets: tourPacketDetails,
      tour_images: tourImages,
      reviews: reviews,
      tour_facilities: tourFacilities,
      culinary_facilities: culinaryFacilities,
      lodging_facilities: lodgingFacilities,
    };

    res.status(200).json({
      success: true,
      message: "Success",
      data: formattedResponse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
    throw new Error("Error fetching tour packet details!");
  }
});

// IMAGE UPLOADS
const uploadImages = asyncHandler(async (req, res) => {
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
    // const imagePaths = req.files.map((file) => `uploads/${file.filename}`);
    const imagePaths = req.files.map((file) =>
      path.join("/public/images/", `${file.filename}`)
    );

    // Your logic to save data in the database
    const allImages = await Promise.all(
      imagePaths.map(async (image) => {
        try {
          const data = await query(
            `INSERT INTO tour_packets_images (id_uuid, tour_packet_id, img_path) VALUES (?, ?, ?)`,
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
        message: "Gambar fasilitas paket wisata ditambahkan!",
      });
    } else {
      // Rollback: Delete all images from server
      await Promise.all(
        imagePaths.map(async (imagePath) => {
          try {
            await fs.unlink(path.join(__dirname, imagePath));
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
        message: "Gambar paket wisata gagal ditambahkan!",
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
      message: "Gambar paket wisata gagal ditambahkan!",
    });

    throw new Error("Gambar paket wisata gagal ditambahkan!");
  }
});

const updateImages = asyncHandler(async (req, res) => {
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
      `SELECT img_path FROM tour_packets_images WHERE tour_packet_id = ?`,
      [id]
    );

    await Promise.all(
      oldImages.map(async (oldImage) => {
        const fullPath = path.join(
          __dirname,
          "public/images/",
          oldImage.img_path
        );
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

    // delete old images from db
    await query(`DELETE FROM tour_packets_images WHERE tour_packet_id = ?`, [
      id,
    ]);

    // Your logic to save data in the database
    const allImages = await Promise.all(
      newImagePaths.map(async (image) => {
        try {
          const data = await query(
            `INSERT INTO tour_packets_images (id_uuid, tour_packet_id, img_path) VALUES (?, ?, ?)`,
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
            await fs.unlink(path.join(__dirname, newImagePath));
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
        message: "Gambar paket wisata gagal diperbarui!",
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
      message: "Gambar paket wisata gagal diperbarui!",
    });

    throw new Error("Gambar paket wisata gagal diperbarui!");
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
    throw new Error(
      "Eror saat mengambil semua data fasilitas di paket wisata!"
    );
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
      message: "Silahkan isi pilih fasilitas dengan benar!",
    });
  }

  try {
    const facilityInsertPromises = facilities.map(async (facility) => {
      const data = await query(
        `INSERT INTO tour_packets_tour_facilities (tour_packet_id, facility_id) VALUES (?, ?)`,
        [id, facility]
      );

      return data;
    });

    const insertedData = await Promise.all(facilityInsertPromises);

    if (insertedData.every((data) => data.length > 0)) {
      return res.json({
        success: true,
        message: "Fasilitas wisata, paket wisata ditambahkan!",
      });
    } else {
      return res.json({
        success: false,
        message: "Fasilitas wisata, paket wisata gagal ditambahkan!",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
    throw new Error(
      "Error saat menyimpan data fasilitas wisata di paket wisata!"
    );
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
      message: "Silahkan isi pilih fasilitas dengan benar!",
    });
  }

  try {
    // Delete existing entries for the given id
    await query(
      `DELETE FROM tour_packets_tour_facilities WHERE tour_packet_id = ?`,
      [id]
    );

    // Insert new facilities
    const facilityInsertPromises = facilities.map(async (facility) => {
      const data = await query(
        `INSERT INTO tour_packets_tour_facilities (tour_packet_id, facility_id) VALUES (?, ?)`,
        [id, facility]
      );

      return data;
    });

    const insertedData = await Promise.all(facilityInsertPromises);

    if (insertedData.every((data) => data.length > 0)) {
      return res.json({
        success: true,
        message: "Fasilitas wisata, paket wisata diperbarui!",
      });
    } else {
      return res.json({
        success: false,
        message: "Fasilitas wisata, paket wisata gagal diperbarui!",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
    throw new Error(
      "Error saat mengubah data fasilitas wisata di paket wisata!"
    );
  }
});

// CULINARY FACILITIES POST AND PUT (CREATE AND UPDATE)
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
      message: "Silahkan isi pilih fasilitas dengan benar!",
    });
  }

  try {
    const facilityInsertPromises = facilities.map(async (facility) => {
      const data = await query(
        `INSERT INTO tour_packets_culinary_facilities (tour_packet_id, facility_id) VALUES (?, ?)`,
        [id, facility]
      );

      return data;
    });

    const insertedData = await Promise.all(facilityInsertPromises);

    if (insertedData.every((data) => data.length > 0)) {
      return res.json({
        success: true,
        message: "Fasilitas kuliner, paket wisata ditambahkan!",
      });
    } else {
      return res.json({
        success: false,
        message: "Fasilitas kuliner, paket wisata gagal ditambahkan!",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
    throw new Error(
      "Error saat menyimpan data fasilitas wisata di paket wisata!"
    );
  }
});

const updateCulinaryFacilities = asyncHandler(async (req, res) => {
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
      message: "Silahkan isi pilih fasilitas dengan benar!",
    });
  }

  try {
    // Delete existing entries for the given id
    await query(
      `DELETE FROM tour_packets_culinary_facilities WHERE tour_packet_id = ?`,
      [id]
    );

    // Insert new facilities
    const facilityInsertPromises = facilities.map(async (facility) => {
      const data = await query(
        `INSERT INTO tour_packets_culinary_facilities (tour_packet_id, facility_id) VALUES (?, ?)`,
        [id, facility]
      );

      return data;
    });

    const insertedData = await Promise.all(facilityInsertPromises);

    if (insertedData.every((data) => data.length > 0)) {
      return res.json({
        success: true,
        message: "Fasilitas kuliner, paket wisata diperbarui!",
      });
    } else {
      return res.json({
        success: false,
        message: "Fasilitas kuliner, paket wisata gagal diperbarui!",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
    throw new Error(
      "Error saat mengubah data fasilitas kuliner di paket wisata!"
    );
  }
});

// LODGING FACILITIES POST AND PUT (CREATE AND UPDATE)
const addLodgingFacility = asyncHandler(async (req, res) => {
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
      message: "Silahkan isi pilih fasilitas dengan benar!",
    });
  }

  try {
    const facilityInsertPromises = facilities.map(async (facility) => {
      const data = await query(
        `INSERT INTO tour_packets_lodging_facilities (tour_packet_id, facility_id) VALUES (?, ?)`,
        [id, facility]
      );

      return data;
    });

    const insertedData = await Promise.all(facilityInsertPromises);

    if (insertedData.every((data) => data.length > 0)) {
      return res.json({
        success: true,
        message: "Fasilitas penginapan, paket wisata ditambahkan!",
      });
    } else {
      return res.json({
        success: false,
        message: "Fasilitas penginapan, paket wisata gagal ditambahkan!",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
    throw new Error(
      "Error saat menyimpan data fasilitas penginapan di paket wisata!"
    );
  }
});

const updateLodgingFacilities = asyncHandler(async (req, res) => {
  const { facilities } = req.body;
  const { id } = req.params;
  // return console.log(facilities);
  if (
    !facilities ||
    !Array.isArray(facilities) ||
    facilities.length === 0 ||
    !id
  ) {
    return res.status(400).json({
      success: false,
      message: "Silahkan isi pilih fasilitas dengan benar!",
    });
  }

  try {
    // Delete existing entries for the given id
    await query(
      `DELETE FROM tour_packets_lodging_facilities WHERE tour_packet_id = ?`,
      [id]
    );

    // Insert new facilities
    const facilityInsertPromises = facilities.map(async (facility) => {
      const data = await query(
        `INSERT INTO tour_packets_lodging_facilities (tour_packet_id, facility_id) VALUES (?, ?)`,
        [id, facility.value]
      );

      return data;
    });

    const insertedData = await Promise.all(facilityInsertPromises);

    if (insertedData.every((data) => data.length > 0)) {
      return res.json({
        success: true,
        message: "Fasilitas penginapan, paket wisata diperbarui!",
      });
    } else {
      return res.json({
        success: false,
        message: "Fasilitas penginapan, paket wisata gagal diperbarui!",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
    throw new Error(
      "Error saat mengubah data fasilitas penginapan di paket wisata!"
    );
  }
});

const getAll = asyncHandler(async (req, res) => {
  try {
    const allData = await query(`SELECT
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
    tp.id;
  
  
  `);
    if (allData.length === 0) {
      return res.json({
        message: "Not FOund",
        data: allData,
        success: true,
      });
    }
    return res.json({
      message: "ok",
      data: allData,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      data: allData,
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

    // Check if data is empty
    if (allData.length === 0) {
      return res.json({
        message: "Not Found",
        data: allData,
        success: true,
      });
    }

    // Respond with the data
    return res.json({
      message: "ok",
      data: allData,
      success: true,
    });
  } catch (error) {
    console.log(error);
    // Handle error without referencing allData
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
});


module.exports = {
  getCreateTourPacket,
  createTourPacket,
  updateTourPacket,
  deleteTourPacket,
  getAllTourPacket,
  getOneTourPacket,
  uploadImages,
  updateImages,
  addTourFacility,
  updateTourFacility,
  addCulinaryFacility,
  updateCulinaryFacilities,
  addLodgingFacility,
  updateLodgingFacilities,
  getAllFacilities,
  getOneTourPacketBySlug,
  getAll,
  getThree,
};
