const express = require("express"); 
const router = express.Router(); 
const userController = require("../controllers/userController")
const authController = require("../controllers/authController"); 
const auth = require("../middleware/auth");


// login + registration end points
router.post("/register", authController.register);
router.post("/login", authController.login);

// protect routes
router.use(auth);

// protected routes
router.route("/viewMemberDetails").get(userController.userDetails);
router.route("/carparkDetails").get(userController.carparkDetails);


module.exports = router;
