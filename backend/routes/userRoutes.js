const express = require("express")
const router = express.Router()
const { login, logout, getuserdetails} = require("../controllers/userControllers")
const { isAuthenticated } = require("../middleware/auth")
const {validateLogin} = require("../middleware/validation") 

//login
router.route("/login").post(validateLogin, login)

//logout
router.route("/logout").post(isAuthenticated, logout)

//dashboard (get user details)
router.route("/dashboard").get(isAuthenticated, getuserdetails)

module.exports = router