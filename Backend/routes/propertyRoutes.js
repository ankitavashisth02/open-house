const express = require('express');
const router= express.Router();
const jwt= require('jsonwebtoken');
const key = "eoubouYBiycenauocbaonpicne";
const property = require('../controllers/propertyControllers.js');


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

router.post('/createlist',property.createList);
router.put('/updateproperty/:id',property.updatedProperty)
router.get('/getallcities',property.getAllCities);
router.get('/getallproperties',property.getAllProperties);
router.get('/getpropertybyCity/:city',property.getPropertyByCity);

module.exports = router;