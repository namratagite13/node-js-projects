
const mongoose = require('mongoose');


const connectToDB = async() => {
    try{
        await mongoose.connect('mongodb+srv://namratagiteblogapp2001:namratagiteblogapp2001@cluster0.oo7znvc.mongodb.net/')
        console.log('MongoDB connected successfully.');
        

    }catch(error){
        console.log('MongoDB connection failed!!', error);
        process.exit(1)

    }
}

module.exports = connectToDB;