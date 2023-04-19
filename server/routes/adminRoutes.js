const express=require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/admin",adminController.admin);
router.post("/admin",adminController.adminonPost)
router.get("/dashboard",adminController.Dashboard);
router.get("/adminRecipie",adminController.adminRecipies);
router.get("/adminUser",adminController.users);
router.get("/adminCategory",adminController.category);
router.get("/addRecipie",adminController.addRecipie);
router.post("/addRecipie",adminController.addRecipieonPost);
router.get("/addCategory",adminController.addCategory);
router.post("/addCategory",adminController.addCategoryonPost);
router.post("/adminRecipie",adminController.deleteRecipe)
router.post("/dashboard",adminController.deleteRecipe)
router.post("/adminCategory",adminController.deleteCategory)
router.get("/EditRecipe/:id",adminController.editRecipe);
router.post("/EditRecipe/:id",adminController.editRecipeonput);

module.exports = router;
