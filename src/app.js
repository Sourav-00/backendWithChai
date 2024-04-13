import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express();
 

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

// Settings for data acceptance from different points or data configurations 

app.use(express.json({limit:"16kb"})) // Middleware to limit the json data comes from user
app.use(express.urlencoded({extended:true,limit:"16kb"}))  // middleware to tell the server that the data can also come from URLs so please understand it and encode it.
app.use(express.static("public")) // middleware that  stores the static files like image videos etc inside public folder
app.use(cookieParser())  // it is used to get and store the data in users browser


//routes
import userRouter from "./routes/user.routes.js"

//routes declarations
app.use("/users",userRouter)
export {app}