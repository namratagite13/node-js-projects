
const express =  require('express')
const authMiddleware = require('../middleware/auth-middleware')
const isAdminUser = require('../middleware/admin-middleware')
const uploadMiddleware = require('../middleware/upload-middleware')
const {uploadImage, fetchImagesController, deleteImageController} = require('../controllers/image-controllers')
const router = express.Router();

//upload an image
router.post('/upload', authMiddleware, isAdminUser, uploadMiddleware.single("image"), uploadImage);
router.get('/get', authMiddleware, fetchImagesController);
router.delete('/:id', authMiddleware, isAdminUser, deleteImageController)



module.exports = router