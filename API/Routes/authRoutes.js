const express = require('express');
const { handleUserSignup, handleUserLogin, handleUserLogout } = require('../Controller/authController')
const { signupValidation, loginValidation } = require('../Middleware/authValidation')

const router = express.Router();






router.post("/signup", signupValidation, handleUserSignup);


router.post("/login", loginValidation , handleUserLogin);



router.post("/logout", handleUserLogout);





module.exports = router;