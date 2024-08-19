const userModel = require("../model/model");
const bcrypt = require("bcrypt");
const token = require("jsonwebtoken");

const getUsers = async (req, res) => {
    try {
      const getUser = await userModel.find();
      res.json({
        message: "you have fetched data successfully successfully",
        users: getUser,
        status: 200,
      });
    } catch (error) {
      res.json({
        error: error,
        message: "couldnt get the users",
      });
    }
  };



  const getSingleUser = async (req, res) => {
    const id = req.params.userid;
  
    try {
      const getUserbyid = await userModel.findOne({ _id: id });
  
      if (getUserbyid) {
        res
          .status(200)
          .send({
            users: getUserbyid,
            message: "you got the user details successfully",
          });
      } else {
        res.status(404).send({ message: "user not found with thise id" });
      }
    } catch (error) {
      res
        .status(404)
        .send({
          message:
            "provide correct id or email to find the user or mismatched or if you are trying to give a email instead give a id",
        });
    }
  }

  const userCreation = async (req, res) => {
    const {Email,Password}  = req.body;

  
    try {
      const findEmail = await userModel.findOne({ Email });
      if (findEmail) {
        res.status(409).send({
          message: "user with thise email already exists",
        });
      } else {
        const hashPassword = await bcrypt.hash(Password,10);
        const userDetails = await userModel.create({...req.body,Password : hashPassword});
        res.json({
          message: "you have posted data successfully",
          users: userDetails,
          status: 200,
        });
      }
    } catch (err) {
      res.json({
        error: err,
        message:
          "users schema doesnt supported please check the keys in the object or some required feilds are missing or type mismatch",
      });
    }
  }

  const userUpdate = async (req, res) => {
    const id = req.params.userid;
    try {
      const userpresent = await userModel.findById(id);
      if (userpresent) {
        const updateUser = await userModel.findByIdAndUpdate(id, req.body, {
          new: true,
        });
        return res
          .status(200)
          .send({ message: "user updated successfully", user: updateUser });
      } else {
        res
          .status(404)
          .send({ message: "user with thise email id or id doesnt exist" });
      }
    } catch (error) {
      res
        .status(404)
        .send(" if you are trying to give a email instead give a id");
    }
  }
  
  const deleteUser  = async (req, res) => {
    const id = req.params.userid;
    try {
      const userExists = await userModel.findById(id);
      if (userExists) {
        const deleteUser = await userModel.findByIdAndDelete(id);
        res.status(200).send({ message: "user deleted successfully" });
      } else {
        res
          .status(404)
          .send({ message: "user with thise email or id doesnt exist " });
      }
    } catch (error) {
      res
        .status(404)
        .send(
          "give proper details or mismatched types or if you are trying to give a email instead give a id"
        );
    }
  }

  const loginUser = async(req,res) =>
  {
    const {Email,Password} = req.body;
    const findUser = await userModel.findOne({Email});
    if(findUser)
    {
      const comparePasswords = await bcrypt.compare(Password,findUser.Password);
      if(comparePasswords)
      {
        const jwt = token.sign({Email},process.env.JWT_KEY,{expiresIn : '1d'});
        const updateUser = await userModel.findByIdAndUpdate(findUser._id,{JwtToken : jwt},{new : true});
        return res.send({
          message : 'You have logged in successfully now you can utilize the jwt token',
          updatedUser : updateUser
        })
      }
    return  res.send({message : 'details mismatched enter a correct password'});
    }
    return res.send({message : 'user with thise email id doesnt exist , kindly  create a account'})

  }

  module.exports = {getUsers,deleteUser,userUpdate,userCreation,getSingleUser,loginUser}