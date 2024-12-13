const express = require('express')
const router = express.Router();
const {createTeacher,loginTeacher} = require('../controllers/teacherAuthController');

router.post('/createTeacher',createTeacher)
router.post('/loginTeacher',loginTeacher);

router.get('/createTeacher',function(req,res){
    const error = req.flash('error');
    res.render('addteacher',{error})
})


module.exports = router