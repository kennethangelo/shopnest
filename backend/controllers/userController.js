import asyncHandler from "express-async-handler";

// @desc    Auth user/set token
// route    POST /api/users/auth
// @access  Public

//Mongoose method returns Promise, so use async await. Don't have to use it, can use try catches.
//By using async handler, wrap it around each controller function and allow to use custom error handler
const authUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Auth User" });
});

// @desc    Register a new user
// route    POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Register User" });
  });


// @desc    Logout user
// route    POST /api/users/logout
// @access  Public
const logOutUser = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Logout User" });
  });

// @desc    Get user profile
// route    GET /api/users/profile
// @access  Private (must get user token)
const getUserProfile = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "User Profile" });
  });

// @desc    Update user profile
// route    PUT /api/users/profile
// @access  Private (must get user token)
const updateUserProfile = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Update User Profile" });
  });



export { authUser, registerUser, logOutUser, getUserProfile, updateUserProfile };
