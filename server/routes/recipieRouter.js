const express = require("express")
const recipieController = require("../controllers/recipieController")
const router = express.Router();
const auth = require("../middleware/auth")


router.get("/",recipieController.homepage)
router.get("/recipe/:id",recipieController.exploreRecipe)
router.get("/categories/:id",recipieController.exploreCategories)
router.post("/search",recipieController.searchRecipe)
router.get('/exploreLatest', recipieController.exploreLatest);
router.get('/exploreRandom', recipieController.exploreRandom);
router.get('/submitRecipe',auth, recipieController.submitRecipe);
router.post('/submitRecipe', recipieController.submitRecipeonPost);
router.get('/contact', recipieController.contact);
router.post('/contact', recipieController.contactonPost);
router.get('*',recipieController.errorpage);  


module.exports = router; 