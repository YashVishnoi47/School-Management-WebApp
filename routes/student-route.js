const express = require('express')
const router = express.Router();
const {createStudent,loginStudent,studentlogout} = require('../controllers/studentAuthController')


router.post("/createstudent",createStudent);

router.get("/createstudent",async function(req,res){
    const error = req.flash('error');
    res.render('addstudent',{error})
});

router.post("/loginstudent",loginStudent);
router.get("/logoutstudent",studentlogout);

module.exports = router