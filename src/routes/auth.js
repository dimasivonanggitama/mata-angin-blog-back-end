const { authController } = require("../controllers");
const router = require("express").Router();
const { usernameValidator, emailValidator, passwordValidator, phoneValidator, dbVerificator } = require("../middleware");

router.post("/login", authController.login);
router.post("/register", usernameValidator, emailValidator, passwordValidator, phoneValidator, dbVerificator, authController.register);

module.exports = router;