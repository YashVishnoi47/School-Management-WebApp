require('dotenv').config()
const mongoose  = require('mongoose');
const express = require('express');

const connectDB = async function(req,res){

    try {
        const connection = await mongoose.connect(process.env.MONGO_URI);
        console.log("Server is runing")
    } catch (error) {
        console.log("Server Connection Error", error);
        
    }
};


module.exports = connectDB