//To use router
import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  logOutUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logOutUser);
//It's combining two function of GET and PUT, because url /profile has two different methods in the header
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
//router menjalankan middleware protect yang ada di authMiddleware, lalu jika token ada, maka next() dalam const protect akan menjalankan function getUserProfile/updateUserProfile
export default router;
