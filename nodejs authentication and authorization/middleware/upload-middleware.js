
const multer = require('multer')
const path = require('path')

//The first argument to cb is for an error (set to null if no error), and the second argument is the result.

//set the multer storage
//cb = CALLBACK
//path In the context of Multer (as in your previous questions), you often see path used within 
// the storage configuration, particularly in the destination and filename functions, to construct platform-independent paths for saving uploaded files.
const storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, 'uploads/')
    },

    filename : function(req, file, cb){
        cb(null, 
            file.fieldname+ "-" + Date.now()+ path.extname(file.originalname)
        )
    }
})
//check file filter which type of media it is 

const checkFileFilter = (req, file, cb) =>{
    if(file.mimetype.startsWith('image')){
        cb(null, true)
    }else{
        cb(new Error("Not an image!, please upload only image"))
    }

}

// multer middleware

module.exports = multer({
    storage: storage,
    fileFilter: checkFileFilter,
    limits:{
        fileSize: 10 *1024 *1024 // 5mb
    }
})