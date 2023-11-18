import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc    Auth user/set token
// route    POST /api/users/auth
// @access  Public

//Mongoose method returns Promise, so use async await. Don't have to use it, can use try catches.
//By using async handler, wrap it around each controller function and allow to use custom error handler
const authUser = asyncHandler(async (req, res) => {
  // res.status(401);
  // throw new Error('Something went wrong');
  const {email, password} = req.body;
  const user = await User.findOne({email});
  if(user && await(user.matchPassword(password))){
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Register a new user
// route    POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  // console.log(req.body); //Berisi data yang akan dikirim di body HTTP
  const {name, email, password} = req.body; //To deconstruct the request's body
  //After get the body data, check if the password exists
  const userExists = await User.findOne({email});
  //If exists, throw Error
  if(userExists){
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name, email, password
  });

  if(user){
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Logout user
// route    POST /api/users/logout
// @access  Public
const logOutUser = asyncHandler(async (req, res) => {
  //Delete the cookie
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0), //expires now
  });
  res.status(200).json({ message: "User logged out" });
});

// @desc    Get user profile
// route    GET /api/users/profile
// @access  Private (must get user token)
const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email
  }
  res.status(200).json(user);
});

// @desc    Update user profile
// route    PUT /api/users/profile
// @access  Private (must get user token)
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if(user){ 
    //If user is not inclued in the body request, just use the original name
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if(req.body.password){
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  } 
});

export {
  authUser,
  registerUser,
  logOutUser,
  getUserProfile,
  updateUserProfile,
};
