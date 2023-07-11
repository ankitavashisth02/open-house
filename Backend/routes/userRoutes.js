const express = require("express");
const users = require("../controllers/userControlles");
const router = express.Router();
const jwt= require('jsonwebtoken');
const key = "eoubouYBiycenauocbaonpicne";

router.post("/signup", users.signUp);
router.post("/login", users.login);
router.post("/verifyotp", users.verifyOtp);
router.post("/resetpassword/:id", users.resetPassword);

// not using 
router.post('/generateotp',users.generateOtp);

router.use(function (req, res, next) {
  var token = req.headers["x-access-token"];
  if (token) {
    jwt.verify(token, key, function (err, decoded) {
      if (err) {
        return res.send({
          status: false,
          error: err,
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  }
});

router.put('/updateuser', users.updateUser);
router.get('/getprofile', users.getProfile);

module.exports = router;
