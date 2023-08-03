const { blogController } = require("../controllers");
const router = require("express").Router();
const { tokenVerificator } = require("../middleware");

// router.post("/categories", authController.login);
// router.post("/favorites", authController.login);
// router.post("/likes", authController.login);
// router.post("/posts", authController.login);
// router.post("/remove", authController.login);
router.post("/create", tokenVerificator, blogController.createBlog);
module.exports = router;