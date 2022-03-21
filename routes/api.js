var express = require ('express');
var router = express.Router();
var app = require("@forkjs/group-router");
var auth = require("../middleware/auth");

var AuthController = require("../controller/AuthController");

router.post('/login',AuthController.login);
router.post('/register',AuthController.register);
router.post('/forget-password',AuthController.forgetPassword);
router.post('/verify-otp',AuthController.verifyOtp);
router.post('/resend-otp',AuthController.resendOtp);

module.exports = router;
