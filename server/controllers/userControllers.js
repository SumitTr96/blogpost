const User = require('../models/userModel')
const HttpError = require("../models/errorModel")
const bcrypt=require('bcryptjs')


//===========REGISTER NEW USER========//
// POST : api/users/register
//UNPROTECTED
const registerUser=async (req,res,next)=>{
    try {
        const {name,email,password,confirmPassword}=req.body;
        if(!name || !email || !password){
            return next(new HttpError("Fill in all details", 422))
        }
        const newEmail= email.toLowerCase()

        const emailExists=await User.findOne({email: newEmail})
        if(emailExists){
            return next(new HttpError("Email already exists", 422))
        }
        if((password.trim()).length<6)
        {
            return next(new HttpError("Password should be atleast 6 characters", 422))
        }
        if(password != confirmPassword){
            return next(new HttpError("Password does not match",422))
        }
        const salt =await bcrypt.genSalt(10)
        const hashedPass= await bcrypt.hash(password, salt);
        const newUser = await User.create({name,email:newEmail, password:hashedPass})
        res.status(201).json(`New user ${newUser.email} registered`)
    } catch (error) {
        return next(new HttpError("User registration failed", 422))
    }
}

//===========LOGIN A REGISTERED USER========//
// POST : api/users/login
//UNPROTECTED

const loginUser=async (req,res,next)=>{
    res.json("login user")
}

//===========USER PROFILE========//
// POST : api/users/:id
//PROTECTED

const getUser=async (req,res,next)=>{
    res.json("User Profile")
}

//===========EDIT USER DETAILS========//
// POST : api/users/edit-user
//PROTECTED

const editUser=async (req,res,next)=>{
    res.json("Edit User Details")
}

//===========GET USERS========//
// POST : api/users/:id
//UNPROTECTED

const getAuthors=async (req,res,next)=>{
    res.json("Get all users/authors")
}


//===========CHANGE AVATAR========//
// POST : api/users/change-avatar
//PROTECTED

const changeAvatar=async (req,res,next)=>{
    res.json("Change User Avatar")
}
module.exports={editUser,registerUser,loginUser,getAuthors,getUser,changeAvatar}