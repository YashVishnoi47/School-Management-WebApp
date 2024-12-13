const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const teacherModel = require("../models/teacher-model");

module.exports.createTeacher = async function (req, res) {
  try {
    const {
      teacherName,
      teacherEmail,
      teacherFullname,
      teacherMob,
      teacherAdd,
      teacherPassword,
    } = req.body;

    // Validate Inputs
    if (
      !teacherName ||
      !teacherEmail ||
      !teacherFullname ||
      !teacherMob ||
      !teacherAdd ||
      !teacherPassword
    ) {
     req.flash("error","All Fields Are Required");
     return res.redirect("/teacher/createTeacher")
    }

    let teacher = await teacherModel.findOne({ teacherEmail });
    if (teacher) {
      req.flash("error","Teacher Already Exists.");
      return res.redirect('/teacher/createTeacher')
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(teacherPassword, saltRounds);

    let createdTeacher = await teacherModel.create({
      teacherName,
      teacherEmail,
      teacherFullname,
      teacherMob,
      teacherAdd,
      teacherPassword: hashedPassword,
    });

    return res.redirect('/owner/ownerprofile')
  } catch (error) {
    console.error(error);
    res.send("internal Server Error");
  }
};

module.exports.loginTeacher = async function (req, res) {
  const { teacherName, teacherEmail, teacherPassword } = req.body;

  if (!teacherName || !teacherEmail || !teacherPassword) {
    return req.flash("error", "All Fields are required");
  }

  const teacher = await teacherModel.findOne({ teacherEmail });
  if (!teacher) {
    return req.flash("error", "Teacher does not exists");
  }

  const isMatch = await bcrypt.compare(
    teacherPassword,
    teacher.teacherPassword
  );

  if (!isMatch) {
    return req.flash("error", "Incrrect Password");
  }

  const token = jwt.sign({ _id: teacher._id }, process.env.JWT_KEY);

  res.cookie("teacherToken", token, { httponly: true });
  req.flash("success", "Successfully logged in ");
  res.send("Successfully logged in"); //Debug
  // return res.redirect("/");
};

module.exports.teacherlogout = async function (req, res) {
  try {
    res.clearCookie("teacherToken", { httponly: true });

    req.flash("success", "Successfully logged out");
    res.redirect("/");
  } catch (error) {
    req.flash("error", "Internal Server Error");
    return res.redirect("/");
  }
};
