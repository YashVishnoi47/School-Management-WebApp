const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const studentModel = require("../models/student-model");

module.exports.createStudent = async function (req, res) {
  try {
    const {
      studentName,
      studentEmail,
      studentPassword,
      studentClass,
      studentNumber,
      studentADD,
    } = req.body;

    if (
      !studentName ||
      !studentEmail ||
      !studentPassword ||
      !studentClass ||
      !studentNumber ||
      !studentADD
    ) {
      req.flash("error", "All the fields are required");
      return res.redirect('/student/createstudent')
    }

    let student = await studentModel.findOne({ studentEmail });
    if (student) {
      req.flash("error", "Student Already Exsists");
      res.send("Student exists");
      return res.redirect('/student/createstudent');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(studentPassword, saltRounds);

    let createdStudent = await studentModel.create({
      studentName,
      studentEmail,
      studentPassword: hashedPassword,
      studentClass,
      studentNumber,
      studentADD,
    });

    res.send(createdStudent);
  } catch (error) {
    console.error(error);
    return req.flash("error", "Internal Server Error");
  }
};

module.exports.loginStudent = async function (req, res) {
  try {
    const { studentName, studentEmail, studentPassword } = req.body;

    if (!studentName || !studentEmail || !studentPassword) {
      return req.flash("error", "All the fields are required");
      // return res.redirect('/')
    }

    const student = await studentModel.findOne({ studentEmail });
    if (!student) {
      return req.flash("error", "Student Does not exists");
      // return res.redirect('/')
    }

    const isMatch = await bcrypt.compare(
      studentPassword,
      student.studentPassword
    );
    if (!isMatch) {
      req.flash("error", "Incorrect Password");
      return res.send("Incorrect Password"); //Debug
      //   return res.redirect("/");
    }

    const token = jwt.sign({ _id: student._id }, process.env.JWT_KEY);

    res.cookie("studentToken", token, { httponly: true });
    req.flash("success", "Successfully logged in ");
    res.send("Successfully logged in"); //Debug
    // return res.redirect("/");
  } catch (error) {
    console.error(error);
  }
};

module.exports.studentlogout = async function (req, res) {
  try {
    res.clearCookie("studentToken", { httponly: true });

    req.flash("success", "Successfully logged out");
    res.redirect("/");
  } catch (error) {
    req.flash("error", "Internal Server Error");
    return res.redirect("/");
  }
};
