

const mongoose = require('mongoose')

const ImageSchema = new mongoose.Schema({

    url:{
        type:String,
        required: true
    },
    publicId:{
        type: String,
        required: true,
    },
    uploadedBy:{
        type: mongoose.Schema.Types.ObjectId,
        //whichever user is currently uploading  image we are referring this to that user.
        ref: "User",
        required: true,

    },
},{timestamps:true})

module.exports = mongoose.model('Image',ImageSchema);