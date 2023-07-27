require("../connection/db")
const Category = require("../models/Category")
const Recipe = require("../models/Recipe")
const Register = require("../models/register")


exports.admin=(req,res)=>{
    try {

        const tells = req.flash("tells")
                res.render('admin',{title:"Admin Panel",tells})
              
              } catch (error) {
                res.status(500).send({message: error.message || "Something went wrong 😩" });
              
              }
              }


exports.adminonPost=async (req,res)=>{
    try {
        const adminemail = req.body.adminemail;
        const adminpassword = req.body.adminpassword;
        if(adminemail=="admin" && adminpassword=="admin"){
           
            res.redirect("/dashboard")
        }
        else{

            req.flash("tells", "INVALID CREDIENTIALS 😩 ")
            res.redirect("/admin")
        }
        }
        catch (error) {
        res.status(500).send({message: error.message || "Something went wrong 😩" });
      
      } 
      }



exports.Dashboard= async (req,res)=>{
try{

    const users = await Register.estimatedDocumentCount();
    console.log(users);
    const recipies = await  Recipe.estimatedDocumentCount();
    const category = await Category.estimatedDocumentCount();
const data = await Register.find({}).sort({_id:-1}).limit(5);
const recipe = await Recipe.find({}).sort({_id:-1}).limit(5);
const infoErrors = req.flash('infoErrors');
const infoSubmit = req.flash('infoSubmit');
    res.render("dashboard",{
        title:"Admin Panel ",users,recipies,category,data,recipe,infoErrors,infoSubmit
    }) 
}
    catch (error) {
        res.status(500).send({message: error.message || "Something went wrong 😩" });
      
      }
}

exports.adminRecipies=async (req,res)=>{
  const infoErrors = req.flash('infoErrors');
  const infoSubmit = req.flash('infoSubmit');
    const recipe = await Recipe.find({}).sort({_id:-1})
    res.render("adminRecipie",{recipe,infoErrors,infoSubmit})

}

exports.users = async (req,res)=>{
const data = await Register.find({});
res.render("adminUser",{data});
}

exports.category =async(req,res)=>{
    const categ = await Category.find({});
    const sweets = await  Recipe.where({ 'category': 'sweets' }).countDocuments();
console.log(sweets);
    res.render("adminCategory",{categ,sweets})
}

exports.addRecipie = async(req,res)=>{
    try {
        const infoErrors = req.flash('infoErrors');
        const infoSubmit = req.flash('infoSubmit');
      
const category = await Category.find({});

        res.render('addRecipie', { title: ' add Recipe' ,infoErrors,infoSubmit,category} );
       
      } catch (error) {
        res.status(500).send({message: error.message || "Something went wrong 😩" });
        
      }
     
      }
    

    

exports.addRecipieonPost = async(req, res) => {
    try {
  
      let imageUploadFile;
      let uploadPath;
      let newImageName;
  
      if(!req.files || Object.keys(req.files).length === 0){
        console.log('No Files where uploaded.');
      } else {
  
        imageUploadFile = req.files.image;
        newImageName = Date.now() + imageUploadFile.name;
  
        uploadPath =  './public/img/' + newImageName; 
  
        imageUploadFile?.mv(uploadPath, function(err){ 
          if(err) return res.status(500).send(err); 
        })
  
      }
      // console.log(imageUploadFile + newImageName + uploadPath);
  
  
  
      const newRecipe = new Recipe({
        name: req.body.name,
        description: req.body.description,
        email: req.body.email,
        ingredients: req.body.ingredients,
        category: req.body.category,
        image: newImageName
  
      });
       
      await newRecipe.save();
  
  
   
      req.flash('infoSubmit','Recipe added sucessfully 😄')
  
      res.redirect('/addRecipie' );
    } catch (error) {
      req.flash('infoErrors',error) 
  console.log(error);
      res.redirect('/addRecipie' );
      
    }
   
  }


  exports.addCategory =  (req,res)=>{
    try {
      const infoErrors = req.flash('infoErrors');
      const infoSubmit = req.flash('infoSubmit');
      res.render('addCategory', { title: ' add Category' ,infoErrors,infoSubmit} );
     
    } catch (error) {
      res.status(500).send({message: error.message || "Something went wrong 😩" });
      
    }
   
    }
  
  exports.addCategoryonPost= async(req,res)=>{

    try {
  
      let imageUploadFile;
      let uploadPath;
      let newImageName;
  
      if(!req.files || Object.keys(req.files).length === 0){
        console.log('No Files where uploaded.');
      } else {
  
        imageUploadFile = req.files.image;
        newImageName = Date.now() + imageUploadFile.name;
  
        uploadPath =  './public/img/' + newImageName; 
  
        imageUploadFile.mv(uploadPath, function(err){ 
          if(err) return res.satus(500).send(err); 
        })
  
      }
      // console.log(imageUploadFile + newImageName + uploadPath);
      const newCategory = new Category({
        name: req.body.name,
        image: newImageName
  
      });
       
      await newCategory.save();
  
  
   
      req.flash('infoSubmit','Recipe added sucessfully 😄')
  
      res.redirect('/addRecipie' );
    } catch (error) {
      req.flash('infoErrors',error) 
  console.log(error);
      res.redirect('/addRecipie' );
      
    }
   
  }


  

  exports.deleteRecipe= async(req,res)=>{
    try {
        let recipeId = req.body.id;
        const recipe =  await Recipe.findByIdAndDelete({_id:recipeId})
        req.flash('infoSubmit','Recipe deleted sucessfully 😄')
  
        res.redirect('/dashboard' );
      } catch (error) {
        req.flash('infoErrors',error) 
    console.log(error);
        
        res.redirect("/dashboard") ;             
        
    } 
  }
  exports.deleteCategory= async(req,res)=>{
    try {
        let recipeId = req.body.id;
        const recipe =  await Category.findByIdAndDelete({_id:recipeId})
        req.flash('infoSubmit','Category deleted sucessfully 😄')
  
        res.redirect('/dashboard' );
      } catch (error) {
        req.flash('infoErrors',error) 
    console.log(error);
        
        res.redirect("/dashboard") ;             
        
    } 
  }

  exports.editRecipe = async(req,res)=>{

      try {
        let recipeId = req.params.id;
        const recipe =  await Recipe.findById(recipeId);
        const category = await Category.find({});
        const infoErrors = req.flash('infoErrors');
        const infoSubmit = req.flash('infoSubmit');
        res.render("EditRecipe",{title:"Editrecipe",recipe,category,infoErrors,infoSubmit})                 
        
    } catch (error) {
        res.status(500).send({message: error.message||"Something went wrong 😩"})
        
    }
   
  }

  exports.editRecipeonput = async (req, res)=> {   
    console.log(req.body);
    imageUploadFile = req?.files?.image;
    newImageName =  imageUploadFile?.name;

    uploadPath =  './public/img/' + newImageName; 

    imageUploadFile?.mv(uploadPath, function(err){ 
      if(err) return res.staus(500).send(err);
      })
try{
  const a = await Recipe.findByIdAndUpdate(req.params.id,{$set:req.body, "image": req.files?.image?.name},{new:true});
 
   console.log(a);
      req.flash('infoSubmit','Recipe Edited sucessfully 😄')
      res.redirect('/dashboard' );
  }catch (error) {
      req.flash('infoErrors',error) 
  console.log(error);
      
      res.redirect("/dashboard") ;             
      
  } 

};