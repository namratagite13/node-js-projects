

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        require: true,
        //unique will stop user from creating same username stored in database by other user
        unique: true,
        trim: true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    password:{
        type: String,
        require: true,

    },
    role:{
        type:String,
        enum: ['user', 'admin']
    }

},{timestamps:true});

module.exports = mongoose.model('User', UserSchema)