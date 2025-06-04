
const express = require('express');
const { getAllBlogs, getSingleBlog, getBlogByTitle, addNewBlog, deleteBlog} = require('../controllers/blog-controllers')


//express router
const router = express.Router();


//all routes
router.get('/get',getAllBlogs);
router.get('/get/:id',getSingleBlog);
router.get('/get/"title"', getBlogByTitle);
router.post('/add',addNewBlog);
router.delete('/delete/:id', deleteBlog);


module.exports = router;