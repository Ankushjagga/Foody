const express = require("express")
const authController = require("../controllers/authController")
const router = express.Router();
const auth = require("../middleware/auth")



router.get('/login', authController.login);
router.get('/register', authController.register);
router.post('/register', authController.registeronPost);
router.post("/login",authController.loginonPost)
router.get("/logout",auth,authController.logout)

module.exports = router;
 