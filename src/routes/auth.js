const { authController } = require("../controllers");
const router = require("express").Router();
const { usernameValidator, emailValidator, passwordValidator } = require("../middleware");

router.post("/login", authController.login);
router.post("/register", usernameValidator, emailValidator, passwordValidator, authController.register);

module.exports = router;