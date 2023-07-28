const { authController } = require("../controllers");
const router = require("express").Router();
const { usernameValidator, emailValidator, passwordValidator, phoneValidator } = require("../middleware");

router.post("/login", authController.login);
router.post("/register", usernameValidator, emailValidator, passwordValidator, phoneValidator, authController.register);

module.exports = router;