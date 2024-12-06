require('dotenv').config();
const express  = require("express");
const app = express();
const mongoose =  require('mongoose');
const flash = require('connect-flash');
const expressSession = require('express-session');
const connectDB = require('./config/db');
const path = require('path')

connectDB();

app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(flash());
app.use(expressSession({
    secret:process.env.SECRET_KEY,
    resave:false,
    saveUninitialized:true
}));


app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");


const indexrouter = require('./routes/index');
app.use('/',indexrouter);




const port = process.env.PORT || 3000;
app.listen(port);
 

