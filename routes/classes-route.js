const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const classModel = require("../models/classes-model");
const studentModel = require("../models/student-model");

router.post("/createClass", async function (req, res) {
  try {
    const { className, classSection } = req.body;

    if (!className || !classSection) {
      req.flash("error", "All the fields are required");
      return res.redirect("/");
    }

    let classs = await classModel.findOne({ className, classSection });
    if (classs) {
      req.flash("error", "class Already Exists");
      return res.redirect("/");
    }

    let createdClass = await classModel.create({
      className,
      classSection,
    });

    res.send(createdClass);
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    req.flash("error","Internal Server Error");
  }
});


router.get('/addStudents/:classid', async (req, res) => {
    try {
        const classid = req.params.classid;
        const classInfo = await classModel.findById(classid);

        if (!classInfo) {
            req.flash("error", "Class not found.");
            return res.redirect('/classes');
        }

        res.render('add-students', { classInfo });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.get('/searchStudents', async (req, res) => {
    try {
        const { query } = req.query;
        const students = await studentModel.findOne({studentName})
            ;

        res.send(students);
        console.log(students);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
    
router.get("/classdetails/:classid", async function (req, res) {

  try {
    const classid = req.params.id;

    let classDetails = await classModel
      .findById(classid)
      .populate("teacher", "name ")
      .populate("students", "name ");

    if (!classDetails) {
      req.flash("error", "Class not found");
      return res.redirect("/");
    }

    res.send(classDetails);
  } catch (error) {
    console.error("Error fetching class details:", error);
  };
});




module.exports = router;





