const express = require('express');
const router = express.Router();
const {getUsers,deleteUser,userUpdate,userCreation,getSingleUser,loginUser} = require('../controllers/users')
const authorization = require('../utils/auth')

router.route("/get-users").get(authorization,getUsers)

router.route("/create-user").post(userCreation)

router.route("/get-user/:userid").get(authorization, getSingleUser)

router.route("/delete-user/:userid").delete(authorization,deleteUser)

router.route("/update-user/:userid").put(authorization,userUpdate)

router.route("/login-user").post(loginUser)


module.exports = router;

