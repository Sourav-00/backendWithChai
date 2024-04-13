import { asyncHandler } from "../utils/asyncHandler.js";

// Iss controller file ke ander hum user ko register karwane ka logic likhenge
const registerUser = asyncHandler( async (req,res) =>{   // by using asynchandler we will easily transfering data to the db
    res.status(200).json({
        message:"ok boss"
    })
})

export {registerUser}