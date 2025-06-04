
const Image = require('../models/image');
//These curly braces {} indicate something called destructuring. 
// It's a concise way to extract specific values from an object or an array.
const {uploadToCloudinary} = require('../helpers/cloudinaryHelper')

const fs = require('fs')
const cloudinary = require('cloudinary')

const  uploadImage = async(req, res)=>{
    try{

        //check if file is missing
        if(!req.file){
            return res.status(400).json({
                success:false,
                message: "file is required. Please upload an image."
            })
        }

        //if file is present than upload to cloudinary
        const {url, publicId} = await uploadToCloudinary(req.file.path)

        //store the image url and public id along with uploaded user id
        const newlyUploadedImage = new Image({
            url,
            publicId,
            uploadedBy: req.userInfo.userId

        });

        await newlyUploadedImage.save()

        res.status(201).json({
            success:true,
            message: 'Image uploaded successfully!!',
            image: newlyUploadedImage
        })




    }catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong! please try again'
        })
        
    }

}


// const uploadImageController = async(req,res) =>{

//     try{
//         //check if file is  missing in req object

//         if(!req.file){
//             return res.status(400).json({
//                 success: false,
//                 message:'File is required. Please upload an image'
//             })
//         }


//         //upload to cloudinary
//         const {url, publicId} = await uploadToCloudinary(req.file.path)

//         //store the image url and public id with uploaded userid in database
//         const newlyUploadedImage = new Image({
//             url,
//             publicId,
//             uploadedBy: req.userInfo.userId,
//         })

//         await newlyUploadedImage.save();

//         //delete file from localstorage
//         fs.unlinkSync(req.file.path)

//         res.status(201).json({
//             success: true,
//             message: 'Image uploaded successfully.',
//             image: newlyUploadedImage,

//         })

//     }catch(error){
//         console.log(error);
//         res.status(500).json({
//             success: false,
//             message: 'Something went wrong! Please try again'
//         })
//     }
// }

const  fetchImagesController = async(req,res) =>{

     try{

        // page means currentPage
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 3;
        const skip = (page-1) * limit;
        
        const sortBy = req.query.sortBy || 'createdAt';
        //here asc meaning ascending
        const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
        const totalImages = await Image.countDocuments();
        //this totalPages basically divides pages into half for displaying
        const totalPages = Math.ceil(totalImages/limit);

        const sortObj = {}
        sortObj[sortBy] = sortOrder;
        
        //skip is how many we want to skip and limit is how many we want to show
        const images = await Image.find().sort(sortObj).skip(skip).limit(limit);

        if(images){
            res.status(200).json({
                success: true,
                currentPage : page,
                totalPages: totalPages,
                totalImages: totalImages,
                data: images
            })
       }

     }catch(error){
         console.log(error);
         res.status(500).json({
             success: false,
             message: 'Something went wrong! Please try again'
         })
        
     }
}

const deleteImageController = async(req,res) =>{
    try{

        //you need to get the image first from your cloudinary storage
        const getCurrentIdOfImageToBeDeleted = req.params.id;
        //getting user id
        const userId = req.userInfo.userId;

        //find current image
        const image = await Image.findById(getCurrentIdOfImageToBeDeleted);

        if(!image){
            return res.status(404).json({
                success: false,
                message: 'Image not found!!'
            })
        }
        //if the same user deleting the image who uploaded the image at first place
        if(image.uploadedBy.toString() !== userId){
            return res.status(403).json({
                success: false,
                message: 'you are not authorized to delete this image!'
            })
        }

        //delete this image first from cloudinary
        await cloudinary.uploader.destroy(image.publicId)

        //delete the image from mongodb database
        await Image.findByIdAndDelete(getCurrentIdOfImageToBeDeleted);

        res.status(200).json({
            success: true,
            message: 'image deleted successfully!'
        })


    }catch(e){
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong! Please try again'
        })

    }
}




module.exports = {
    uploadImage,
    fetchImagesController,
    deleteImageController
}