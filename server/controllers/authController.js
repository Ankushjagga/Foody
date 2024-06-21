require("../connection/db")
// const alert = require('alert')
const Register = require("../models/register")
const bcrypt = require("bcrypt")
 
  /* 
      registration 
      */  

    exports.register = async (req,res)=>{
      try {

const tell = req.flash("tell")
const tells = req.flash("tells")
const token= req.cookies.jwt;

        res.render('register',{title:"register",tell,tells,token})
      
      } catch (error) {
        res.status(500).send({message: error.message || "Something went wrong 😩" });
       
      }
      }

      /* 
      registration on post
      */ 

      exports.registeronPost = async (req,res)=>{
        try {
          const existingUser = await Register.findOne({email : req.body.email});
          if(existingUser) {
            req.flash("tells","Email already exists 😟 ")
           return res.redirect("/register")
           
          }
  const password = req.body.password;
  const cpassword=req.body.cpassword;
  if(password===cpassword){
    const data = new Register({
        name:req.body.name,
        password:password,
        cpassword:cpassword,
        phoneNumber:req.body.phoneNumber,
        email:req.body.email
    })
   
              const token = await data?.generateAuthToken();
              console.log(token);
              res.cookie("jwt",token,{
                httpOnly:true
              });
              await data.save();
              req.flash("tell",`Registration sucessfull 😄, welcome ${data.name}`)
            res.redirect("/register")
            }

//  toast("")
  
  else{
    
    req.flash("tells","password doesnot match 😢")
  return res.redirect("/register");
    res.status(400);
  }
  
        
        } catch (error) {
          // Handle errors
          const errors = JSON.parse(error.message)
          console.error("errorrr =================", errors.name);
    if (errors.name === 'MongoServerError') {
      if (errors.code === 11000  && errors.keyPattern.phoneNumber === 1) {
        req.flash("tells", "Phone number already exists 🙄");
      } else {
        req.flash("tells", "MongoDB Error: " + errors.message);
      }
    } 
     else {
      // Handle other errors
      req.flash("tells", "Something went Wrong");
      
    }
    
    // Redirect to registration page with error flash message
    res.status(400).redirect("/register");
        }  
        }
/* 
      login
      */ 


      exports.login = async (req,res)=>{
        try {
          const show=req.flash("show")
          const shows=req.flash("shows") 
          console.log(show);
const token= req.cookies.jwt;
          res.render('login',{title:"login",show,shows,token})
        
        
        } catch (error) {
          res.status(500).send({message: error.message || "Something went wrong 😩" });
        
        }
        }
 
        /* 
      login on post
      */ 
      exports.loginonPost = async (req,res)=>{
        try {
          const email = req.body.email;
          const password = req.body.password;
          const userData = await Register.findOne({email});
          const isMatch = await bcrypt.compare(password,userData.password)
          const token = await userData.generateAuthToken();
          console.log(token);
          

          if(isMatch){
            res.cookie("jwt",token,{
              httpOnly:true
            });
            // Swal.fire('Any fool can use a computer')
            req.flash("show",`Login sucessfull 😄, welcome ${userData.name} 😇` ) 
            // res.status(200).json('login sucess')
            res.redirect("/login")
          }

          else{
            req.flash("shows","invalid crediential 😟")
            // res.status(400).json('invalid ')

            res.redirect("/login")

            // res.send("invalid crediential 😟")
          }
      
       
        
        } catch (error) {
          // res.status(500).send({message: error.message || "Something went wrong 😩" });
          req.flash("tells", "Email not registered , You need to create account")
          res.redirect("/register")
        
        } 
        }


        // logout

        exports.logout = async (req,res)=>{

          try {


            // req.user.tokens = req.user.tokens.filter((currElement)=>{
            //   return currElement.token !== req.token
            // })

            // req.user.tokens =[]
res.clearCookie("jwt");

console.log("logout sucessful");
// alert("Logout sucessfull 😄")
req.flash("show","Logout Sucessfull 😄")


await req.user.save();
res.redirect("login")
 
          } catch (error) {
          res.status(500).send({message: error.message || "Something went wrong 😩" });
            
          }
        }