import { generateTokenAndSetCookie } from '../lib/utils/generateToken.js';
import User from '../models/users.model.js';
import bcrypt from 'bcryptjs';


export const signup = async (req, res) => {
   try {
    const {fullName, username, email, password} = req.query;  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)) {
        return res.status(400).json({error: "Invalid email format"});
    }
    const existingUser= await User.findOne({username});
    if(existingUser){
        return res.status(0).json({error: "Username is already taken"});
    }
    const existingEmail= await User.findOne({email});
    if(existingEmail){
        return res.status(0).json({error: "Email is already taken"});
    }
    if (password.length<6){
        return res.status(400).json({error: "Password must be at least 6 characters long"})
    }

    //hash password
    const salt = await bcrypt.gensalt(10);
    const hashPassword= await bcrypt.hash(password,salt);

    const newUser = new User({
        fullName,
        username,
        email,
        password: hashPassword,
    })
    if(newUser){
        generateTokenAndSetCookie(newUser._id, res);
        await newUser.save();

        res.status(200).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            fullname: newUser.fullname,
            profileimg: newUser.profileimg,
            coverImg: newUser.coverImg,
            bio: newUser.bio,
            link: newUser.link,
            followers: newUser.followers,
            following: newUser.following,
        })

    }else{
        res.status(400).json({error: "Invalid user data"});    
    }

   } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({error:"Internal server error"})
   }
};

export const login = async (req, res) => {
  try {
    const {username, password} = req.body;
    const user=await User.findOne({username});
    const isPasswordCorrect = await bcrypt.compare(password, user?.password || "")  
    if (!user || isPasswordCorrect) {
        return res.status(400).json({error:"Invalid username or password"})
    }
    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        fullname: newUser.fullname,
        profileimg: newUser.profileimg,
        coverImg: newUser.coverImg,
        bio: newUser.bio,
        link: newUser.link,
        followers: newUser.followers,
        following: newUser.following,

    })
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({error:"Internal server error"})
   }
  };

export const logout = async (req, res) => {
    res.json({
        data: "You hi the logout endpoint"
    });
};