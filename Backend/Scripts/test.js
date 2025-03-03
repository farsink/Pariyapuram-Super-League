const cloudinary = require("../utils/Cloudinary");

async function uploadImage(imagePath) {
    try {
        const result = await cloudinary.uploader.upload(imagePath, {
            folder: "PSL",
        });
        return result.secure_url;
    } catch (error) {
        console.error("Error uploading image:", error);
        return null;
    }
}

uploadImage("./Scripts/image.jpeg").then((url) => {
    if (url) {
        console.log("Image uploaded to Cloudinary:", url);
    } else {    
        console.log("Failed to upload image to Cloudinary");
    }
});