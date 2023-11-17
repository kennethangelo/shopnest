//To use router
import express from 'express';
const router = express.Router();
import { authUser,  registerUser, logOutUser, getUserProfile, updateUserProfile } from '../controllers/userController.js';

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logOutUser);
//It's combining two function of GET and PUT, because url /profile has two different methods in the header
router.route('/profile').get(getUserProfile).put(updateUserProfile);

export default router;