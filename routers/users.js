const express = require('express');
const router = express.Router();
const {getUsers,deleteUser,userUpdate,userCreation,getSingleUser,loginUser,uploadPicture} = require('../controllers/users')
const authorization = require('../utils/auth');
const multer = require('multer');
const memory = multer.memoryStorage();
const upload =  multer({storage : memory});



router.route("/get-users").get(getUsers);

router.route("/create-user").post(userCreation);

router.route("/get-user/:userid").get( getSingleUser);

router.route("/delete-user/:userid").delete(deleteUser);

router.route("/update-user/:userid").put(userUpdate);

router.route("/login-user").post(loginUser);

router.route("/upload-pic/:userid").put(upload.single('image'),uploadPicture);


module.exports = router;

