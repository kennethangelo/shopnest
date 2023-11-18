//To get the payload from the token which is userID
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

//MIDDLEWARE USE NEXT FUNCTION
//To protect route so that you have to be logged in to process that route
const protect = asyncHandler(async (req, res, next) => {
  let token;
  //get cookie called jwt
  //bcs cookie-parser, we can just call the cookie name
  token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //req can be accessed from the route
      //decoded has userID because when token is generated, userId is in the payload
      //Because the user included password, select beside the password
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, invalid token");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export { protect };
