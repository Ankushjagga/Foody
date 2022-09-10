const jwt = require("jsonwebtoken");
const register =  require("../models/register");
// const alert =  require("alert")
const auth = async (req,res,next)=>{

try {

    const token = req.cookies.jwt;
    const verifyUser = jwt.verify(token,process.env.SECRETE_KEY)

    const user = await register.findOne({_id:verifyUser._id});

    req.user = user;
    req.token = token;

    next()
    
} catch (error) {
    // alert("YOU NEED TO LOGIN FIRST 🆗")
    res.redirect("login")
}

}
module.exports = auth