const { authController } = require("../controllers");
const router = require("express").Router();
const { usernameValidator, emailValidator, passwordValidator, phoneValidator, dbVerificator } = require("../middleware");

router.post("/login", emailValidator, passwordValidator, authController.login);
router.post("/register", usernameValidator, emailValidator, passwordValidator, phoneValidator, dbVerificator, authController.register);
router.post("/resendRegisterToken", authController.resendRegisterToken);
router.patch("/verification", authController.verifyEmail);
module.exports = router;