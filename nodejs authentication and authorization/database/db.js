const mongoose = require('mongoose');


const connectToDB = async() =>{
    try{
        await mongoose.connect('mongodb+srv://namratagitenode-auth13:namratagitenode-auth13@cluster0.2xi77q9.mongodb.net/');
        console.log('MongoDB connection successful!!');
        

    }catch(e){
        console.log('MongoDB connection failed with error!!!');
        process.exit(1)
        
    }
}

module.exports = connectToDB