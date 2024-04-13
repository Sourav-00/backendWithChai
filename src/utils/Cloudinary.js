// This Utils is used in uploading files on cloudinary (because we not store the files directly in db) 
import { v2 as cloudinary } from "cloudinary";  // library for cloudinary features and methods 
import fs from "fs"  // node.js inbulid liberary for the local file system 

cloudinary.config({   // It needs connfiguration to link with the account of us on the cloudiary, it provides api key and api_secret to access the uploads on the cloudinary
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
  });

  // the below function is taking a local file path of the file and uplaoding the file on the cloudinary, this function become a template for the uploading purpose of the file on cloudinary

const uploadOnCloudinary = async (localFilePath) =>{
    try {
        if(!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        console.log("file is uploaded on cloudinary", response.url);
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the local saved file
        return null;
    }
}

export {uploadOnCloudinary}   // now we use the upload function where we need to insert the file upload
