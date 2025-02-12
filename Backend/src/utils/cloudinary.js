import { v2 as cloudinary } from "cloudinary";

// Configuration
cloudinary.config({

    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET

});

const uploadOnCloudinary = async (localFilePath) => {
    try {

        if (!localFilePath) {
            throw new Error("Local file path is required");
        }

        //upload file on cloudinay
        const result = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })

        console.log("file upload on cloudinary")

        return result;

    } catch (error) {
        throw new Error(`Failed to upload file: ${error.message}`);

    }
}

const deleteOnCloudinary = async (publicId) => {

    try {

        if (!publicId) {
            throw new Error("Public ID is required");
        }

        const result = await cloudinary.uploader.destroy(publicId,
            {
                resource_type: "auto"
            }
        );

        return result;

    } catch (error) {
        throw new Error(`Failed to delete file: ${error.message}`);
    }
}


export { uploadOnCloudinary, deleteOnCloudinary }