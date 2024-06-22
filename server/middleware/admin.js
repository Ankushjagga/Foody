const jwt = require("jsonwebtoken");
const register =  require("../models/register");
const isAdmin =  async (req, res, next) => {

try {
    const token = req.cookies.jwt;  
    console.log(token + "token of admiun");
    const verifyUser = jwt.verify(token,process.env.SECRETE_KEY)
console.log("verify user adim ---" + verifyUser);
    const user = await register.findOne({_id:verifyUser._id});
 console.log("admmm user ---" + user);
    req.user = user;
    req.token = token; 

    if (req.user && req.user.role === 'admin') {
        return next(); 
    } else{
        req.flash("tells","Access denied. Only admin  can access this resource")
        return res.redirect("admin")

    }
} 
    


    catch (error) {
        req.flash("tells","Access denied. Only admin  can access this resource")
   return res.redirect("admin")
        
    }


};

module.exports = isAdmin