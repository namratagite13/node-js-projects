
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title:{
        type: String,
        tag: "title",
        require:[true,'book title is required!!'],
        trim: true,
        maxLength: [100, 'book title cannot be more than 100 words!!']
    },
    content:{
        type: String,
        require:[true,'book title is required!!'],
        trim: true,
        maxLength: [2000, 'book title cannot be more than 2000 words!!']
    }

})

module.exports = mongoose.model('Blog', blogSchema);