const Blog = require('../models/Blog');


const getAllBlogs = async(req, res)=>{

    try{
        const listOfAllBlogs = await Blog.find({});
        if(listOfAllBlogs?.length > 0){
            res.status(200).json({
                success: true,
                message: "All blogs fetched successfully",
                data: listOfAllBlogs,
            });
        }
        res.status(404).json({
            success: false,
            message: "No blog found!!"
        })

    }catch(e){
        console.log(e);
        res.status(500).json({
            success:false,
            message: "Something went wrong"
        })
        

    }


}

const getSingleBlog = async(req, res)=>{
    try{
      

        const getBlogById = req.params.id
        const blogDetails =  await Blog.findById(getBlogById)
        if(!blogDetails){
            res.status(404).json({
                success: false,
                message: 'No Blog Found!!',
            })
        }
        res.status(200).json({
            success: true,
            message: 'Blog fetched successfully.',
            data: blogDetails
        })

        
    }catch(e){
        res.status(500).json({
            success:false,
            message:'Something went wrong please try again later.'
        })

    }

}

const getBlogByTitle = async() =>{
    try{
        const getBlogByTitle = await Blog.find({title});
        if(getBlogByTitle){
            res.status(200).json({
                success: true,
                message: "All blogs fetched successfully",
                data: listOfAllBlogs,
            });
        }
        res.status(404).json({
            success: false,
            message: "No blog found!!"
        })


    }catch(e){

    }
}

const addNewBlog = async(req, res)=>{
    try{
        const newBlogData = req.body;
        const newlyCreatedBlog = await Blog.create(newBlogData)

        if(newlyCreatedBlog){
            res.status(200).json({
                success: true,
                message: 'Blog created successfully!!',
                data: newlyCreatedBlog
            })
        }
        res.status(404).json({
            success: false,
            message: 'Cannot create Blog!!'
        })
    }catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'something went wrong please try again!!'
        })
        

    }
}

const deleteBlog = async(req, res)=>{
    try{const getBlogById = req.params.id;
        const findBlogAndDelete = await Blog.findByIdAndDelete(getBlogById);
        if(!findBlogAndDelete){
            res.status(404).json({
                success: false,
                message: "No blog found"
            })
        }
        res.status(200).json({
            success:true,
            message:"Blog deleted successfully!!"
        })

    }catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            message:"Something went wrong please try again!!"
        })
        
    }
    

}

module.exports = {
    getAllBlogs,
    getSingleBlog,
    getBlogByTitle,
    addNewBlog,
    deleteBlog
}