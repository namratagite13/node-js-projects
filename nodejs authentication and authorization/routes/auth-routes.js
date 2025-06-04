


// const express = require('express')
// const router = express.Router();


// const { registerUser, loginUser} = require('../controllers/auth-controller')

// //all the routes related to auth & auth
// router.post('/register', registerUser);
// router.post('/login', loginUser);



// module.exports = router;



const express = require('express');
const router = express.Router();

const { registerUser, loginUser, changePassword } = require('../controllers/auth-controller');
const authMiddleware = require('../middleware/auth-middleware')

router.post('/register', registerUser);
router.post('/login', loginUser)
router.post('/change-password',authMiddleware, changePassword)

module.exports = router



