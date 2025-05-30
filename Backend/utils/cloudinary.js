import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        })
        //   console.log("file uploaded successfully",response.url); 
        fs.unlinkSync(localFilePath); // delete the file from local storage
        return response
        
    } catch (error) {
        fs.unlinkSync(localFilePath); // delete the file from local storage
        return null;
    }
}


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET 
        // Click 'View API Keys' above to copy your API secret
});

export { uploadOnCloudinary };