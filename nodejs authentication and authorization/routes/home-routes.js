const express = require('express');
const router = express.Router()
const authMiddleware = require('../middleware/auth-middleware')



//routes
//The length property of an array returns the number of elements in the array
router.get('/welcome', authMiddleware, (req, res ) =>{
    const {userId, username, role} = req.userInfo;
    res.json({
        message: "Welcome to the home page.",
        user:{
            _id: userId,
            username,
            role

        }
    })
})

module.exports = router 