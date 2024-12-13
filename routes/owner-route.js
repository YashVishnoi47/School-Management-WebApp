const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const {
  createOwner,
  loginOwner,
  ownerlogout,
} = require("../controllers/ownerAuthController");
const ownerModel = require('../models/owner-model');
const studentModel = require('../models/student-model')
const teacherModel = require('../models/teacher-model')

// Create Owner Router
router.post("/createowner", createOwner);

// Login Owner Route
router.post("/loginowner", loginOwner);

router.get("/loginowner", function (req, res) {
  const error = req.flash("error");
 res.render('adminLogin',{error});
});


router.get("/ownerprofile", async function (req, res) {
  const success = req.flash("success");
  const owner = await ownerModel.findOne();
  const student = await studentModel.find();
  const teacher = await teacherModel.find();
 res.render('ownerprofile',{success,owner,student,teacher});
});

// Owner Logout Code
router.get("/ownerlogout", ownerlogout);

module.exports = router;
