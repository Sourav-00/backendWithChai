import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import{upload} from "../middlewares/multer.middleware.js"

// user router file will trigger from app.js file on the route ==> url point-> http::localhost:8000/users

const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },{
            name:"coverImage",
            maxCount:1
        }
    ]),
    registerUser
)

// and is the user route trigger for /register route --> it will transfer the control to the user.controller that is build for the user registeration logic



export default router