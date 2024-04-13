import mongoose, {Schema} from "mongoose"
import jwt from "jsonwebtoken" // JSON Web Token (JWT) authentication is a stateless method of securely transmitting information between parties as a JavaScript Object Notation (JSON) object. It is often used to authenticate and authorize users in web applications and APIs.
import bcrypt from "bcrypt"

// user schema 
const userSchema = Schema(
    {
    username:{
        type: String,
        required:true,
        lowercase:true,
        unique:true,
        trim:true,
        index:true,
    },
    email:{
        type: String,
        required:true,
        lowercase:true,
        unique:true,
        trim:true,
    },
    fullname:{
        type: String,
        required:true,
        trim:true,
        index:true,
    },
    avatar:{
        type :String,       //cloudinary url
        required:true,
    },
    coverImage:{
        type :String,       //cloudinary url
    },
    watchHistory:[
        {
            type:Schema.Types.ObjectId,
            ref:"Video"
        }
    ],
    password:{
        type:String,
        required:[true,'Password is reuired'], 
    },
    refreshToken:{
        type:String
    }
},
{
    timestamps:true
})

// mongoose also provide middlewares like pre, post.

userSchema.pre("save", async function(next){      // this is the middleware of mongoose we are using for encryption of the users password just before the save event in the db
    if(this.isModified("password"))
    {
        this.password = bcrypt.hash(this.password,10);     // bcrypt is a library used for encryption of the string/passwords
        next();      // middleware always carry next to transfer control of the process 
    }
    else {
        next();
    }
})

// mongoose also provide to write our own custom methods for different purposes like password checking 
userSchema.methods.isPasswordCorrect = async function(password){
   return await bcrypt.compare(password,this.password)   // bcrypt have a compare function for compare two entity and it returns true and false.
}

// The below mwthod is method is used to generate the access tokens after expiring 
userSchema.methods.generateAccessToken = function(){

    return jwt.sign(
        {
            _id: this._id,                  // store values 
            username: this.username,
            fullname: this.fullname,
            email: this.email
        },
        process.env.ACCESS_TOKEN_SECRET,    // token to be generate again after expire 
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY // expiry time
        }
    )
}

// The below method is used to generate the referesh tokens after expiring 
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            fullname: this.fullname,
            email: this.email
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User",userSchema)