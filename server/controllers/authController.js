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
        res.render('register',{title:"register",tell,tells})
      
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
              req.flash("tell",`Registration sucessfull 😄, welcome ${data.name}`)
              res.redirect("/register")
            }

//  toast("")
  
  else{
    
    req.flash("tells","password doesnot match 😢")
   res.redirect("/register");
    res.status(400);
  }
  
        
        } catch (error) {
          res.status(500)
          req.flash("tells","Email alrady exist 🙄 ")
   res.redirect("/register");
        // console.log(error);
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
          res.render('login',{title:"login",show,shows})
        
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
            res.redirect("/login")
          }

          else{
            req.flash("shows","invalid crediential 😟")
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