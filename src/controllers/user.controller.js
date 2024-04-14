import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import{ApiResponse} from "../utils/ApiResponse.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/Cloudinary.js"
// Iss controller file ke ander hum user ko register karwane ka logic likhenge
const registerUser = asyncHandler( async (req,res) =>{   // by using asynchandler we will easily transfering data to the db
    //get  user details from frontend
    //validation : not empty
    // check if user already exist by its username, email
    // check for image and avtar
    // upload on cloudinary
    // create user object to upload on db
    // remove passwords and refresh tokens
    // check for user creation
    //return response came from db

    const {fullName,email,username,password} = req.body // body gives use data from frontend 
    console.log("email :",email);

    // validation code:
    //way 1: one by one checking 
    // if(fullName == ""){
    //     throw new ApiError(400,"FullName is required")
    // }

    //way 2: in one go check
    if([fullName,username,email,password].some((field)=> field?.trim() === "")){
        throw new ApiError(400,"All fields are required")
    }

    // User model is directly connected to db so, we can find the username or email are already there or not. this findOne method returns true or false 
    // way 1:
    // const existedUser = User.findOne({username})

    //way 2:
    const existedUser = User.findOne({
        $or:[{username},{email}]
    })
    if(existedUser){
        throw new ApiError(409,"User already exists")
    }

    //File Upload Code
    // here we are requesting files with req.files it gives us the file that are uploaded by the user on the frontend similar as req.body 
    //step -1:
    const avatarLocalPath = req.files?.avatar[0]?.path; // taking the path of the file 
    const coverImagePath = req.files?.coverImage[0]?.path;

    // step -2: checking if the path of the avatar is exist or not means the user upload the avatar or not if not then throw error
    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar is required")
    }

    // step-3: after getting local path of teh files ready to upload the files on the cloudinary plateform
    //Note: we already made a util for uplaoding files on cloudinary

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImagePath)

    // check if the avatar is uploaded or not
    if(!avatar){
        throw new ApiError(400,"Avatar file is required")
    }

    // After taking all the required fields from the users we need to push these data of the user on the db as an object.
    // So create data space inside the db only one man is doing this currently that is --> User.model : beacause it is directly connected with db

    const user = await User.create({
        fullName,
        avatar:avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username:username.toLowerCase()
    })
    // To ensure that the data of the user is created in the db

    const createduser = await User.findById(user._id).select("-password -refreshToken")
    // after successfull regisdteration of the user 
    return res.status(201).json(
        new ApiResponse(200,createduser,"User registered Successfully")
    )
})

export {registerUser}