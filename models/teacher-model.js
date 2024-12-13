const mongoose = require('mongoose');


const TeacherSchema = mongoose.Schema({
    teacherName:{
        type:String,
        required:true
    },
    teacherEmail:{
        type:String,
        required:true
    },
    teacherFullname:{
        type:String,
        required:true
    },
    teacherPassword:{
        type:String,
        required:true
    },
    teacherMob:{
        type:Number,
        required:true
    },
    teacherAdd:{
        type:String,
        required:true
    },
});


module.exports = mongoose.model("teacher",TeacherSchema);