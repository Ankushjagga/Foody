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
        res.render('register',{title:"register",tell})
      
      } catch (error) {
        res.status(500).send({message: error.message || "Something went wrong 😩" });
      
      }
      }

      /* 
      registration on post
      */ 

      exports.registeronPost = async (req,res)=>{
        try {
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

    const token = await data.generateAuthToken();
    console.log(token);
    res.cookie("jwt",token,{
      httpOnly:true
    });
    await data.save();
    req.flash("tell","Registration sucessfull 😄")
    res.redirect("/submitRecipe")

//  toast("")
  }
  else{
    
    req.flash("tell","Invalid Credientials")
   res.redirect("/register");
    res.status(400);
  }
  
        
        } catch (error) {
          res.status(500).send(  "Something went wrong 😩" );
        
        }
        }
/* 
      login
      */ 


      exports.login = async (req,res)=>{
        try {
          const show=req.flash("show")
          console.log(show);
          res.render('login',{title:"login",show})
        
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
            req.flash("show","Login sucessfull 😄")
            res.redirect("/submitRecipe")
          }

          else{
            req.flash("show","invalid crediential 😟")
            res.redirect("/login")

            // res.send("invalid crediential 😟")
          }
      
       
        
        } catch (error) {
          // res.status(500).send({message: error.message || "Something went wrong 😩" });
          req.flash("tell", "Email not registered , You need to create account")
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