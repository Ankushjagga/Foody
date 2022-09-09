require("../connection/db")
const alert = require('alert')
const Register = require("../models/register")
const bcrypt = require("bcrypt")
 
  /* 
      registration 
      */ 

    exports.register = async (req,res)=>{
      try {


        res.render('register',{title:"register"})
      
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
    res.redirect("/")
 alert("Registration sucessfull 😄")
  }
  else{
    
   
    res.status(400).send("Invalid Credientials")
  }
  
        
        } catch (error) {
          res.status(500).send( "Something went wrong 😩" );
        
        }
        }
/* 
      login
      */ 


      exports.login = async (req,res)=>{
        try {
          res.render('login',{title:"login"})
        
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
          res.cookie("jwt",token,{
            httpOnly:true
          });

          if(isMatch){
            alert("Login sucessfull 😄")

            res.redirect('/')
          }
          else{
            res.send("invalid crediential 😟")
          }
        
        } catch (error) {
          res.status(500).send({message: error.message || "Something went wrong 😩" });
        
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
alert("Logout sucessfull 😄")


await req.user.save();
res.redirect("login")
 
          } catch (error) {
          res.status(500).send({message: error.message || "Something went wrong 😩" });
            
          }
        }