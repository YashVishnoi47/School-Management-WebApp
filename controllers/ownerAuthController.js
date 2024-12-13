const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ownerModel = require("../models/owner-model");

module.exports.createOwner = async function (req, res) {
  try {
    const { email, username, fullname, password } = req.body;

    if (!email || !username || !fullname || !password) {
      req.flash("error", "All the fields are required");
    }

    if (typeof password !== "string") {
      req.flash("error", "Password must be a valid string.");
    }

    let owners = await ownerModel.find();
    if (owners.length > 0) {
      return res.send("You don't have the permission.")
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    let createdOwner = await ownerModel.create({
      email,
      password: hashedPassword,
      fullname,
      username,
    });

    res.send(createdOwner);

    console.log(createdOwner);
  } catch (error) {
    console.error(error);
  }
};

module.exports.loginOwner = async function (req, res) {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      req.flash("error", "All the fields are required");
      return res.redirect("/owner/loginowner");
    }

    const owner = await ownerModel.findOne({ email });
    if (!owner) {
      req.flash("error", "Invalid Email or Password.");
      return res.redirect("/owner/loginowner");
    }

    const isMatch = await bcrypt.compare(password, owner.password);
    if (!isMatch) {
      req.flash("error", "Owner not found, Try again.");
      return res.redirect("/owner/loginowner");
    }

    const token = jwt.sign({ _id: owner._id }, process.env.JWT_KEY);

    res.cookie("ownerToken", token, { httponly: true });
    req.flash("success", "Successfully logged in ");

    return res.redirect("/owner/ownerprofile");
  } catch (error) {
    console.error(error);
    req.flash("error", "Internal Server Error");
  }
};

module.exports.ownerlogout = async function (req, res) {
  try {
    res.clearCookie("ownerToken", { httponly: true });

    req.flash("success", "Successfully logged out");
    res.redirect("/owner/loginowner");
  } catch (error) {
    req.flash("error", "Internal Server Error");
    return res.redirect("/owner/loginowner");
  }
};
