

const cloudinary = require('../config/cloudinary')


const uploadToCloudinary = async(filePath)=>{
    try{

        //this will return asset id , public id
        const result = await cloudinary.uploader.upload(filePath);

        return{
            url: result.secure_url,
            publicId: result.public_id,
        }

    }catch(error){
        console.error('Error while uploading to cloudinary', error);
        throw new Error(" Error while uploading to cloudinary");
        
    }
}

module.exports = {
    uploadToCloudinary,
}