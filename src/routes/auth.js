const { authController } = require("../controllers");
const router = require("express").Router();
const { usernameValidator } = require("../middleware");

router.post("/login", authController.login);
router.post("/register", usernameValidator, authController.register);

module.exports = router;