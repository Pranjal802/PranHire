// import { v2 as cloudinary } from 'cloudinary';
// import fs from 'fs';


// const uploadOnCloudinary = async (localFilePath) => {
//     try {
//         if (!localFilePath) return null;
//         const response = await cloudinary.uploader.upload(localFilePath, {
//             resource_type: "auto",
//         })
//         //   console.log("file uploaded successfully",response.url); 
//         fs.unlinkSync(localFilePath); // delete the file from local storage
//         return response
        
//     } catch (error) {
//         fs.unlinkSync(localFilePath); // delete the file from local storage
//         return null;
//     }
// }



// cloudinary.config({ 
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET 
//         // Click 'View API Keys' above to copy your API secret
// });

// export { uploadOnCloudinary };


import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs/promises'; // Using promises API
import path from 'path';

// Validate configuration early
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

if (!process.env.CLOUDINARY_CLOUD_NAME || 
    !process.env.CLOUDINARY_API_KEY || 
    !process.env.CLOUDINARY_API_SECRET) {
    throw new Error('Cloudinary configuration is missing');
}

const uploadOnCloudinary = async (localFilePath) => {
    if (!localFilePath) return null;

    try {
        // Verify file exists and is accessible
        try {
            await fs.access(localFilePath);
        } catch (err) {
            console.error(`File not found: ${localFilePath}`);
            return null;
        }

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });

        // Asynchronously delete local file after successful upload
        await fs.unlink(localFilePath).catch(err => {
            console.error(`Error deleting local file: ${err.message}`);
        });

        return response;
    } catch (error) {
        console.error('Cloudinary upload error:', error.message);
        
        // Attempt to delete local file if it exists
        try {
            await fs.unlink(localFilePath);
        } catch (unlinkError) {
            console.error('Error cleaning up local file:', unlinkError.message);
        }
        
        return null;
    }
};

export { uploadOnCloudinary };