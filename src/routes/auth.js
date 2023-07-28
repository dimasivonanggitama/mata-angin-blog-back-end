const { authController } = require("../controllers");
const router = require("express").Router();
const { usernameValidator, emailValidator } = require("../middleware");

router.post("/login", authController.login);
router.post("/register", usernameValidator, emailValidator, authController.register);

module.exports = router;