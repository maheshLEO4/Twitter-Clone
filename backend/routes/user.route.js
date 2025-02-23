import express from "express";
import { 
    getUserprofile, 
    getSuggestedUsers, 
    followUnfollowUser, 
    updateUser, 
    getFollowers, 
    getFollowing 
} from "../controllers/user.controller.js";

import { protectRoute } from "../middleware/protectRoute.js";   

const router = express.Router();

router.get("/profile/:username", protectRoute, getUserprofile);
router.get("/suggested", protectRoute, getSuggestedUsers);
router.post("/follow/:id", protectRoute, followUnfollowUser);
router.post("/update", protectRoute, updateUser);

// 🚀 New Routes for Followers and Following
router.get("/:username/followers", protectRoute, getFollowers);
router.get("/:username/following", protectRoute, getFollowing);


export default router;
