const express=require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const isAdmin = require('../middleware/admin')
router.get("/admin",adminController.admin);
router.post("/admin",adminController.adminonPost)
router.get("/dashboard", isAdmin,adminController.Dashboard);
router.get("/adminRecipie",isAdmin,adminController.adminRecipies);
router.get("/adminUser",isAdmin,adminController.users);
router.get("/admincontact",isAdmin,adminController.contacts);
router.get("/adminCategory",isAdmin,adminController.category); 
router.get("/addRecipie",isAdmin,adminController.addRecipie);
router.post("/addRecipie",isAdmin,adminController.addRecipieonPost);
router.get("/addCategory",isAdmin,adminController.addCategory); 
router.post("/addCategory",isAdmin,adminController.addCategoryonPost); 
router.post("/adminRecipie",isAdmin,adminController.deleteRecipe)
router.post("/dashboard",isAdmin,adminController.deleteRecipe)
router.post("/adminCategory",isAdmin,adminController.deleteCategory)
router.get("/EditRecipe/:id",isAdmin,adminController.editRecipe);
router.post("/EditRecipe/:id",isAdmin,adminController.editRecipeonput);

module.exports = router;
