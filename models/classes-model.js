const mongoose = require("mongoose");


const classesSchema = mongoose.Schema({
    className:{
        type:String,
        required:true
    },
    classSection:{
        type:String,
        required:true
    },
    Student:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"student"
    }],
});




module.exports = mongoose.model("class", classesSchema);
