require("../connection/db")
// const alert = require('alert')
const Register = require("../models/register")
const bcrypt = require("bcrypt")
const _ = require("loadsh")
const jwt = require("jsonwebtoken")
 
const nodemailer  = require("nodemailer")
const mailSend = require("../mail/mail")
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
    
const {email , name , phoneNumber , password , cpassword } = req.body;

if(!email || !name || !phoneNumber || !password || !cpassword) {
  req.flash("tells", "Please Enter Fields Correctly !");
  return res.redirect("/register")
}

          const existingUser = await Register.findOne({email : req.body.email});
          if(existingUser) {
            req.flash("tells","Email already exists 😟 ")
           return res.redirect("/register")
           
          }

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
              res.cookie("name",name,{
                httpOnly:true
              });
              await data.save();
              req.flash("tell",`Registration sucessfull 😄, welcome ${data.name}`)
          return  res.redirect("/register")
            }

//  toast("") 
  
  else{
    
    req.flash("tells","password doesnot match 😢")
  return res.redirect("/register");

  }
  
        
        } catch (errors) {
          // Handle errors
          // const errors = JSON.parse(error.message) 
          console.error("errorrr =================", errors);
    if (errors.name === 'MongoServerError') {
      if (errors.code === 11000  && errors.keyPattern.phoneNumber === 1) {
        req.flash("tells", "Phone number already exists 🙄");
 return   res.status(400).redirect("/register");

      } else {
        req.flash("tells", "MongoDB Error: " + errors.message);
   return  res.status(400).redirect("/register");

      }
    } 
    //  else {
    //   // Handle other errors
    //   req.flash("tells", "Something went Wrong");
      
    // } 
    
    // Redirect to registration page with error flash message
   return  res.status(400).redirect("/register");
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
            res.cookie("name",userData.name,{
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
res.clearCookie("name");

console.log("logout sucessful");
// alert("Logout sucessfull 😄")
req.flash("show","Logout Sucessfull 😄")


// await req.user.save();
res.redirect("login")
 
          } catch (error) {
          res.status(500).send({message: error.message || "Something went wrong 😩" });
            
          }
        }



          // forgetpassword

          exports.forgetPassword = async (req,res)=>{

            try {
           const findemail =  req.flash("findemail");
         const notemailfound =  req.flash("notfindemail");
  
 res.status(200).render("forgetPassword",{findemail, notemailfound})
            } catch (error) {
            res.status(500).send({message: error.message || "Something went wrong 😩" });
              
            }
          }




               // forgetpassword

               exports.forgetPasswordonPost = async (req,res)=>{

                try {
      
                 

 // send mail with defined transport object
 const user = await Register.findOne({email : req.body.email});
 if(user){
  let userToJtok = _.pick(user, ["email"])
  let tokCandidate = Object.assign(userToJtok, {
    expiresIn: 600,
  });
  let token = jwt.sign(tokCandidate, process.env.SECRETE_KEY);
  mailSend("Reset your password", `click link to resetPassword : ${process.env.API}/resetPassword/${token}`, req.body.email)

  req.flash("findemail", "Please check your email to reset passowrd")
 
  return res.redirect("/forgetPassword")
  
 }else{
  req.flash("notfindemail", "email not register")
  return res.redirect("/forgetPassword")


 }





                } catch (error) {
                res.status(500).send({message: error.message || "Something went wrong 😩" });
                  
                }
              }





               // resetpasword

          exports.resetPassword = async (req,res)=>{

            try {
           const findemail =  req.flash("findemail");
         const notemailfound =  req.flash("notfindemail");
  
 res.status(200).render("resetPassword",{findemail, notemailfound})
            } catch (error) {
            res.status(500).send({message: error.message || "Something went wrong 😩" });
              
            }
          }




          
               // resetpasword

               exports.resetPasswordonPut = async (req,res)=>{

                try {
        const decoded = jwt.verify(req.params.token, process.env.SECRETE_KEY);

const user = await Register.findOne({email : decoded.email}); 
if(!user){
  req.flash("notfindemail", "Invalid token")
}
const {password , cpassword} = req.body;
if(!password || !cpassword){
  req.flash("notfindemail", "pelase Enter fields correctly");
  return res.redirect(`/resetPassword/${req.params.token}`)
}
const passwordhash = await bcrypt.hash(password, 10)
const cpasswordhash = await bcrypt.hash(cpassword, 10)

const reset = await Register.updateOne({email: decoded.email}, {password: passwordhash , cpassword : cpasswordhash})

const findemail =  req.flash("findemail", "password updated sucessfully");
return res.redirect(`/resetPassword/${req.params.token}`)





               
              } catch (error) {
                const notemailfound =  req.flash("notfindemail", "password not updated");
                res.status(500).send({message: error.message || "Something went wrong 😩" });
                  
                }
              }