const mongoose = require("mongoose");
const Property = require("../models/propertyModel.js");
const ObjectID = mongoose.Types.ObjectId;
const path = require("path");
const multer = require("multer");

exports.createList = (req, res) => {
  uploadThumbnail(req, res, async (err) => {
    const user = req.decoded;
    if (err) {
      return res.status(500).json({
        status: false,
        message: err.message,
      });
    }

    const { areaSize, price, lotSize, beds, bathrooms } = req.body;
    const { "address.city": city, "address.postalCode": postalCode } = req.body;

    // Validate required fields
    if (!price || !areaSize || !city || !postalCode) {
      return res.status(400).send({
        status: false,
        message: "All fields are required",
      });
    }
    // Check if thumbnail is provided
    if (!req.file) {
      return res.status(400).json({
        status: false,
        message: "Thumbnail is required",
      });
    }
    const thumbnail = req.file.filename;
    try {
      const newList = new Property({
        createdBy: user.id,
        areaSize,
        price,
        address: {
          city,
          postalCode,
        },
        thumbnail,
        lotSize,
        beds,
        bathrooms,
      });

      const savedList = await newList.save();

      res.status(201).json({
        message: "Property created successfully",
        data: savedList,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  });
};

// Define storage for thumbnail file
const thumbnailStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../images"); // set destination folder
  },
  filename: function (req, file, cb) {
    cb(null, "thumbnail-" + Date.now() + path.extname(file.originalname));
  },
});

// Create multer object with storage options
const uploadThumbnail = multer({ storage: thumbnailStorage }).single(
  "thumbnail"
);

// Function to upload Thumbnails
// function uploadThumbnail(req) {
//   return Promise((resolve, reject) => {
//     //Logo validation
//     if (!req.files || Object.keys(req.files).length === 0) {
//       return reject({
//         status: false,
//         message: "Thumbnail is required",
//       });
//     } else {
//       var Img = req.files.thumbnail;
//       var extension = path.extension(Img.name);
//       var file_name = "img-" + Date.now() + extension;
//       var uploadPath = "../images" + file_name;

//       Img.mv(uploadPath, function (err) {
//         if (err) {
//           return reject({
//             status: false,
//             message: err.message,
//           });
//         }
//         return resolve({
//           status: true,
//           message: "Thumbnail uploaded successfully!",
//           file_name: file_name,
//         });
//       });
//     }
//   });
// }

/*
Upaditng any details regarding prpoerty
 */
exports.updatedProperty = async (req, res) => {
  uploadThumbnail(req, res, async (err) => {
    const user = req.decoded;
    if (err) {
      return res.status(500).json({
        status: false,
        message: err.message,
      });
    }

    const propertyId = req.params.id;

    const { areaSize, price, lotSize, beds, bathrooms } = req.body;
    const city = req.body["address.city"];
    const postalCode = req.body["address.postalCode"];
    
    let thumbnail = "";
    if (req.file) {
      thumbnail = req.file.filename;
    }

    try {
      const propertyToUpdate = {};

      if (city) {
        propertyToUpdate["address.city"] = city;
      }

      if (postalCode) {
        propertyToUpdate["address.postalCode"] = postalCode;
      }
      const updatedProperty = await Property.findByIdAndUpdate(
        propertyId,
        {
          areaSize,
          price,
          ...propertyToUpdate,
          lotSize,
          beds,
          bathrooms,
          ...(thumbnail && { thumbnail }), // Include the thumbnail only if it exists
        },
        { new: true }
      );

      if (!updatedProperty) {
        return res.status(404).json({
          status: false,
          message: "Property not found",
        });
      }

      res.status(200).json({
        status: true,
        message: "Property updated successfully",
        data: updatedProperty,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  });
};

/**
 *
 * Getting all Properties without any filter
 */
exports.getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json({
      status: true,
      data: properties,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

/**********
 * Getting all the cities in an array for the search on the basis on city
 */
exports.getAllCities = async (req, res) => {
  try {
    const allCities = await Property.distinct("address.city");
    res.status(200).json({
      status: true,
      data: allCities,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

/**
 *
 * Getting Properties with location based search on the basis of location
 */
exports.getPropertyByCity = async (req, res) => {
  try {
    const city = req.params.city;

    const properties = await Property.find({ "address.city": city });

    res.status(200).json({
      status: true,
      data: properties,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};
