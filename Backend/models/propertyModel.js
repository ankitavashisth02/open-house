const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    thumbnail: { type: String },
    price: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, required: true },
    areaSize: { type: String, required: true },
    lotSize: { type: String, required: true },
    address: {
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      additionalInfo: { type: String },
    },
    beds: { type: String },
    bathrooms: { type: String },
    status: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const PropertyDetails = mongoose.model("PropertyDetails", userSchema);
module.exports = PropertyDetails;
