require('dotenv').config;
const express = require('express');
const app = express();
const blogRoutes = require('./routes/blog-routes')


//port
const PORT = process.env.PORT || 3000;


//middleware
app.use(express.json())

//database 
const connectToDB = require("./database/db");
connectToDB();


//routes
app.use('/api/blog', blogRoutes)



//port
app.listen(PORT, () =>{
    console.log(`server is listening on ${PORT}`);
    
})