const jwt = require("jsonwebtoken");
const register =  require("../models/register");
const isAdmin =  async (req, res, next) => {

try {
    const token = req.cookies.jwt;  
    const verifyUser = jwt.verify(token,process.env.SECRETE_KEY)

    const user = await register.findOne({_id:verifyUser._id});
 
    req.user = user;
    req.token = token; 

    // Assuming you store the user object in req.user after authentication
    if (req.user && req.user.role === 'admin') {
        return next(); // User is authorized, continue to the next middleware or route handler
    } 
} 
    


    catch (error) {
        req.flash("tells","Access denied. Only admin users can access this resource")
    res.redirect("admin")
        
    }


};

module.exports = isAdmin