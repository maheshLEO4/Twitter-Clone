import User from "../models/user.model.js";
import jwt from "jsonwebtoken";  


export const protectRouter =async (req, resizeBy, next) =>{
  try {
    const token = req.cookies.jwt;
    if(!token){
        return res.status(401).json({error: "Unathorized No Token provided"})
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(!decoded){
        return res.status(401).json({error: "Unathorized:invalid token"})
    }
      const  User =await User.findById(decoded.userId).select("-password");
      if(!User){
        return res.status(404).json({error: "User not found"});
      }
      req.user=User;
  } catch (error) {
    console.log("Error in protectRouter middleware",error.message);
    return res.status(500).json({error: "Internal Server Error"}) 
    
  }
}
