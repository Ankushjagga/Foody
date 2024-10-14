const express = require("express")
const authController = require("../controllers/authController")
const router = express.Router();
const auth = require("../middleware/auth")
const notAuth = require("../middleware/notAuth")



router.get('/login', authController.login);
router.get('/register',authController.register);
router.post('/register', authController.registeronPost);
router.post("/login",authController.loginonPost)
router.get("/logout",auth,authController.logout)
router.get("/forgetPassword",authController.forgetPassword)
router.post("/forgetPassword",authController.forgetPasswordonPost)
router.get("/resetPassword/:token",authController.resetPassword)
router.post("/resetPassword/:token",authController.resetPasswordonPut)

module.exports = router;
 