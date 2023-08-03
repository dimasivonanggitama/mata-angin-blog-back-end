const { blogController } = require("../controllers");
const router = require("express").Router();
const { tokenVerificator, multerUpload } = require("../middleware");

// router.post("/categories", authController.login);
// router.post("/favorites", authController.login);
// router.post("/likes", authController.login);
// router.post("/posts", authController.login);
// router.post("/remove", authController.login);
router.post("/create", tokenVerificator, multerUpload.single("image"), blogController.createBlog);
module.exports = router;