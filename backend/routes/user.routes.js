import express from "express";
import { getUserprofile, getSuggestedUsers, followunfollowUser,updateUserProfile } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/profile/:username",protectRoute, getUserprofile);
router.get("/suggested",protectRoute, getSuggestedUsers);
router.post("/follow/:id",protectRoute, followunfollowUser);
router.post("/update",protectRoute, updateUserProfile);
export default router;