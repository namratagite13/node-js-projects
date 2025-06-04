
// require('dotenv').config()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//register controllers

const registerUser = async(req,res)=>{
    try{
        //extract user information from your req body;
        const {username, email, password, role} = req.body;

        //check if user is already exist in database
        const checkExistingUser = await User.findOne(
            {$or:[{username}, {email}]});
        if(checkExistingUser){
            return res.status(400).json({
                success: false,
                message: "User is already exist either with same username or same email. please try with different username or email."
            })
        }
        //user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        //create new user;
        const newlyCreatedUser =  new User({
            username,
            email,
            password : hashedPassword,
            role : role || 'user'
        })
        await newlyCreatedUser.save();

        if(newlyCreatedUser){
            res.status(201).json({
                success: true,
                message: 'User registered successfully!'
            })
        }else{
            res.status(400).json({
                success: false,
                message: 'Unable to register user please try again'
            })
        }


    }catch(e){
        console.log(e);
        res.status(500).json({
            success:false,
            message: 'Something went wrong, please try again later!!'
        })
        
    }
}


//login controllers

const loginUser = async(req,res)=>{
    try{
        const { username, password } = req.body;

        //find if the current user is exist in database or not
        const user = await User.findOne({username});

        if(!user){
            return res.status(400).json({
                success:false,
                message: "Invalid Credentials!!"
            })
        }



        //if the password is correct or not //comparing the password with database stored password
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if(!isPasswordMatch){
            return res.status(400).json({
                success: false,
                message: "Invalid credentials!!"
            })
        }
        //create token
        const accessToken = jwt.sign({
            userId : user._id,
            username : user.username,
            role : user.role 

        }, process.env.JWT_SECRET_KEY,{
            expiresIn: '30m'
            
        })

        res.status(200).json({
            success: true,
            message: 'Logged in successfully!!',
            accessToken
        })




    }catch(e){
        console.log(e);
        res.status(500).json({
            success:false,
            message: 'Something went wrong, please try again later!!'
        });

    };
};

//change password

const  changePassword = async(req, res) =>{
    try{
        // you have to be logged in to change password
        //for getting current user id
        const userId = req.userInfo.userId;
        //first you need to extract old password and give new password
        const {oldPassword, newPassword} = req.body;

        //find current logged in user
        const user = await User.findById(userId);

        if(!user){
            return res.status(400).json({
                success:false,
                message: 'User not found!!'
            })
        }

        //check if old password is correct

        const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);

        if(!isPasswordMatch){
            return res.status(400).json({
                success:false,
                message: 'Old password is not correct! please try again.'
            })
        }

        //hash the new password here
        const salt = await bcrypt.genSalt(10);
        const newHashedPassword = await bcrypt.hash(newPassword, salt);

        //update user password
        user.password = newHashedPassword
        await user.save();

        res.status(200).json({
            success:true,
            message: 'Password changed successfully!!'
        })


    }catch(e){
        console.log(e);
        res.status(500).json({
            success:false,
            message: 'Something went wrong, please try again later!!'
        });

    }

}

module.exports = {loginUser, registerUser, changePassword}

