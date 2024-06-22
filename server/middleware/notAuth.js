const jwt = require("jsonwebtoken");
const register =  require("../models/register");
// const alert =  require("alert")
const notAuth = async (req,res,next)=>{

try {

    const token = req.cookies.jwt;  


if(token ){
    return res.redirect("/")
}else{

   return  next()
}

} catch (error) {
    console.log(error);
    req.flash("shows","You need to Logout first 🆗")

}

}
module.exports = notAuth