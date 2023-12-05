require('dotenv').config()
const express = require("express");
const hbs = require("hbs")
const path = require("path");
const routes = require("./server/routes/recipieRouter")
const auth = require("./server/routes/authRouter")
const admin = require("./server/routes/adminRoutes")
const fileUpload = require('express-fileupload');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const app =express(); 
const port = process.env.PORT ||8000

const viewspath = path.join(__dirname,"templates/views");
const partialspath = path.join(__dirname,"templates/partials");
const adminpath = path.join(__dirname,"templates/views/admin");

app.use(express.static("public"))    
 
app.use(express.urlencoded({extended:true}))

app.use(express.json());    
app.use(cookieParser('ankushkumarjaggaok')); 
app.use(session({
  secret: 'ankushkumarjaggasecrete',
  saveUninitialized: true,
  resave: true
}));
app.use(flash());
app.use(fileUpload());

app.set("view engine","hbs")
app.set("views",[viewspath, adminpath])
// app.set("views",adminpath)
hbs.registerPartials(partialspath);
hbs.registerHelper('isdefined', function (value) {
    return value !== undefined;
  });

  app.use("/",auth)
  app.use("/",admin)
app.use("/",routes)

app.listen(port,()=>{
    console.log("server running at" + port);
})   