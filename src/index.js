// require('dotenv').config()   // this runs fine but breaks the consistency of import statement
// import dotenv from "dotenv"   //  to hum aesa hi follow krte hai but config hum niche kr lenge 
import {} from 'dotenv/config' // This works because of how ES6 modules imports modules. Before doing anything else in a file (say index.js) it does all the imports first. It does a depth first traversal of these imports, executing any code inside it.
import connectDB from "./db/index.js";
// dotenv.config({path:'./env'})
 // import upar standard way me kr liya hai but config yaha kr liya 


connectDB() // function callling from DB folder to connect with DB
// As early as possible in your application, import and configure dotenv: (Taaki jaha bhi env variable use ho rhe hai wo sabhi unhe jitna jaldi ho ske mil jaaye tbhi hum unhe entry point ki files me hi import kr lenge)
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is running on port: ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("MONGODB db connection failed !!",err);
})

/*
#APPROACH - 1
import express from "express"
const app = express();

(async ()=>{
   try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`); // connecting with the db through link provided by the mongoDB altas (THE db link stored on env file)

    app.on("err",(err)=>{
        console.log(err);
    })
    app.listen(process.env.PORT,()=>{
        console.log(`App is listening on Port: ${process.env.PORT}`)
    })
   } catch (error) {
        console(error)
        throw error
   }
})()
*/