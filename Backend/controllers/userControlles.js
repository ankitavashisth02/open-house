const Users = require("../models/userModel");
const jwt = require("jsonwebtoken");
const secretKey = "eoubouYBiycenauocbaonpicne";
const { generateOTP } = require("../utils/otp");
const { sendSMS } = require("../utils/sms");
const { validationResult } = require("express-validator");

// SIGN UP API creating new users
exports.signUp = async (req, res) => {
  const {
    firstName,
    lastName,
    companyName,
    phoneNumber,
    password,
    confirmPassword,
  } = req.body;

  // Validate request
  if (
    !firstName ||
    !lastName ||
    !companyName ||
    !phoneNumber ||
    !password ||
    !confirmPassword
  ) {
    res.status(400).send({
      status: false,
      message: "All fields are required",
    });
    return;
  }

  try {
    // Check if the user already exists
    let user = await Users.findOne({ phoneNumber });
    if (user) {
      return res.status(400).send({
        status: false,
        message: "Phone number already exists in the database",
      });
    }

    // Generate OTP
    const otp = generateOTP();

    // Save user details and OTP to the database
    user = new Users({
      firstName,
      lastName,
      companyName,
      phoneNumber,
      password,
      otp,
      status: false,
    });
    await user.save();

    // Send OTP to the user's phone number
    const message = `Your OTP for sign-up is ${otp}`;
    sendSMS(phoneNumber, message);

    return res.status(200).send({
      status: true,
      message: "OTP has been sent. Please verify your Number !",
      data: user,
    });
  } catch (err) {
    return res.status(500).send({
      status: false,
      message: err.message,
    });
  }
};

// API To verrify OTP
exports.verifyOtp = async (req, res) => {
  const { phoneNumber, otp } = req.body;

  try {
    // Find the user by phone number
    const user = await Users.findOne({ phoneNumber: phoneNumber });
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    // Check if OTP matches
    if (user.otp !== otp) {
      return res.status(400).json({
        status: false,
        message: "Invalid OTP",
      });
    }

    // OTP verified successfully, update the user document
    user.otp = "";
    user.status = true;
    await user.save();

    return res.status(200).json({
      status: true,
      message: "OTP verified successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

// Login API with username AS phone number and matching password from Database
exports.login = (req, res) => {
  const { phoneNumber, password } = req.body;

  Users.findOne({ phoneNumber })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          status: false,
          message: "User not found",
        });
      }

      if (user.password !== password) {
        return res.status(401).send({
          status: false,
          message: "Invalid password",
        });
      }

      // Generate and send JWT token
      const token = jwt.sign(
        {
          id: user._id,
          companyName: user.companyName,
          phoneNumber: user.phoneNumber,
        },
        secretKey,
        { expiresIn: "2h" }
      );
      return res.status(200).send({
        status: true,
        message: "Login successful",
        data: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          phoneNumber: user.phoneNumber,
          companyName: user.companyName,
        },
        token,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        status: false,
        message: err.message,
      });
    }); 
};

// reseting password
exports.resetPassword = async (req, res) => {
  const id = req.params.id;
  const { password, confirmPassword } = req.body;

  const user = await Users.findById(id);
  console.log(user.password, "user.password");

  if (password != confirmPassword) {
    return res.status(400).send({
      status: false,
      message: "Password and confirm password do not match",
    });
  }

  if (password === user.password) {
    return res.status(400).send({
      status: false,
      message: "New Password is same as prevoius !",
    });
  }

  Users.findByIdAndUpdate(
    id,
    {
      $set: {
        password: password,
        confirmPassword: confirmPassword,
      },
    },
    { new: true }
  )
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          status: false,
          message: `User not found with id ${id}`,
        });
      }
      return res.status(200).send({
        status: true,
        message: "Password updated successfully!",
        data: user,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        status: false,
        message: err.message,
      });
    });
};

/*  UUdating user details
 */
exports.updateUser = async (req, res) => {
  try {
    const userId = req.decoded.id;
    const { firstName, lastName, companyName, phoneNumber } = req.body;
    const updatedUser = await Users.findByIdAndUpdate(
      userId,
      { firstName, lastName, companyName, phoneNumber },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "UserDetails  updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    return res.status(500).send({
      status: false,
      message: err.message,
    });
  }
};

// API for Generating random 6 digits OTP (NOT USING NOW)
exports.generateOtp = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { phoneNumber } = req.body;
  try {
    // const user = await Users.findOne({ phoneNumber });
    // if (!user) {
    //   return res.status(404).json({
    //     status: false,
    //     message: "User not found",
    //   });
    // }

    // Generate OTP and save it to the user's document in the database
    const otp = generateOTP();
    // user.otp = otp;
    // await user.save();

    // Send OTP to user's phone number
    const message = `Your OTP for resetting the password is ${otp}`;
    sendSMS(phoneNumber, message);

    return res.status(200).json({
      status: true,
      message: "OTP sent to the user",
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

exports.getProfile = (req, res) => {
  try {
    const user = req.decoded;

    Users.findOne({ _id: user.id }).then((data) => {
      if (!data) {
        return res.status(404).json({
          status: false,
          message: "No profile found",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Getting profile successfully",
          data: data,
        });
      }
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};
