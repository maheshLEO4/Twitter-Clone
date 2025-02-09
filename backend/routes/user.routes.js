import express from "express";
import { getUserprofile, getSuggestedUsers, followUnfollowUser, updateUser } from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";   
const router = express.Router();

router.get("/profile/:username",protectRoute, getUserprofile);
router.get("/suggested",protectRoute, getSuggestedUsers);
router.post("/follow/:id",protectRoute, followUnfollowUser);
router.post("/update",protectRoute, updateUser);
export default router;