import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";

// user router file will trigger from app.js file on the route ==> url point-> http::localhost:8000/users

const router = Router()

router.route("/register").post(registerUser)  // and is the user route trigger for /register route --> it will transfer the control to the user.controller that is build for the user registeration logic



export default router