const express = require("express");
const router = express.Router();
const multer = require("multer")
const UserController = require("../controller/userController");
const check = require("../middlewares/auth");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/avatars/")
    },
    filename: (req, file, cb) => {
        cb(null, "avatar-" + Date.now() + "-" + file.originalname);
    }
});

const uploads = multer({storage});

router.get("/user-test", check.auth, UserController.userTest);

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/profile", check.auth, UserController.profile);
router.get("/profileList/:page?", check.auth, UserController.list);
router.put("/update", check.auth, UserController.updateProfile);
router.post("/upload", [check.auth, uploads.single("file0")], UserController.uploadImage);
router.get("/avatar/:file", check.auth, UserController.avatar);

module.exports = router;