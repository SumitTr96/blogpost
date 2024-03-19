const Post=require('../models/postModel')
const User=require('../models/userModel')
const path=require('path')
const fs=require('fs')
const {v4:uuid}=require('uuid')
const HttpError=require('../models/errorModel')


const getPostCount = async (authorId) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/count/${authorId}`);
      return response.data.count;
    } catch (error) {
      console.log(error);
      return 0; // Default to 0 if there's an error
    }
  };
  const fetchAndUpdateAuthors = async () => {
    setIsLoading(true);
    try {
      const updatedAuthors = await Promise.all(authors.map(async (author) => {
        const postCount = await getPostCount(author._id);
        return { ...author, posts: postCount };
      }));
      setAuthors(updatedAuthors);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const handlePostChange = () => {
    fetchAndUpdateAuthors(); // Call this function after creating, editing, or deleting a post
  };
  

//=====================CREATE A POST===========
// POST : api/posts
//PROTECTED

const createPost=async (req,res,next)=>{
    try {
        let {title,category,description}=req.body;
        if(!title || !category || !description || !req.files){
            return next(new HttpError("Fill in all fields and choose thummbnail",422))
        }
        const {thumbnail}=req.files
        //check the filee size
        if(thumbnail.size>2000000){
            return next(new HttpError("Thumbnail should be less than 2mb"))
        }
        let fileName=thumbnail.name;
        let splittedFilename=fileName.split(".")
        let newFilename=splittedFilename[0] + uuid()+"."+splittedFilename[splittedFilename.lenght-1]
        thumbnail.mv(path.join(__dirname,"..",'/uploads',newFilename),async(err)=>{
            if(err){
                return next(new HttpError(err))
            }else{
                const newPost=await Post.create({title,category,description,thumbnail:newFilename,creator: req.user.id})
                if(!newPost){
                    return next(new HttpError("Post couldn't be created",422))
                }
                // find user and increase post count by 1
                const currentUser=await User.findById(req.user.id);
                const userPostCount=currentUser.posts+1;
                await User.findByIdAndUpdate(req.user.id,{posts:userPostCount})
                res.status(200),res.json(newPost)
            }
        })
    } catch (error) {
        return next(new HttpError(error))
    }    fetchAndUpdateAuthors();
}


//=====================GET ALL POSTS===========
// GET : api/posts
//UNPROTECTED

const getPosts=async (req,res,next)=>{
    try {
        const posts=await Post.find().sort({updatedAt: -1})
        res.status(200).json(posts)
    } catch (error) {
        return next(new HttpError(error))
    }
}



//=====================GET SINGLE POST===========
// GET : api/posts/ :id
//UNPROTECTED

const getPost=async (req,res,next)=>{
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);

        if (!post) {
            return next(new HttpError("Post not found", 404));
        }

        res.status(200).json(post);
    } catch (error) {
        console.error("Error fetching post:", error.message);
        return next(new HttpError("Internal Server Error", 500));
    }
}



//=====================GET POSTS BY CATEGORY===========
// GET : api/posts/categories/:category
//PROTECTED

const getCatPosts=async (req,res,next)=>{
    try {
        const {category}=req.params;
        const catPosts=await Post.find({category}).sort({createdAt: -1})
        res.status(200).json(catPosts)
    } catch (error) {
        return next(new HttpError(error))
    }
}



//=====================GET USER/AUTHOR POST===========
// GET : api/posts/users/:id
//UNPROTECTED

const getUserPosts=async (req,res,next)=>{
    try {
        const {id}=req.params;
        const posts=await Post.find({creator:id}).sort({createdAt: -1})
        res.status(200).json(posts)
    } catch (error) {
        return next(new HttpError(error))
    }
}



//=====================EDIT A POST===========
// PATCH : api/posts/:id
//PROTECTED

const editPost=async (req,res,next)=>{
    try {
        let fileName;
        let newFilename;
        let updatedPost;
        const postId=req.params.id;
        let{title,category,description}=req.body;

        if(!title || !category || description.length < 12){
            return next(new HttpError("Fill in all the fields",422))
        }
        if(!req.files){
            updatedPost=await Post.findByIdAndUpdate(postId,{title,category,description},{new:true})

        }else{
            // get old post from database
            const oldPost=await Post.findById(postId);
            // delete old thumbnail from upload
            fs.unlink(path.join(__dirname,"..",'uploads',oldPost.thumbnail),async(err)=>{
                if(err){
                    return next(new HttpError(err))
                }
                
            })
            //upload new thhumbnail
            const {thumbnail}=req.files;
            //Check the fie size
            if(thumbnail.size>2000000)
            {
                return next(new HttpError("Thubnail size should be less than 2mb"))
            }
            fileName= thumbnail.name;
            let splittedFilename=fileName.split('.')
            newFilename=splittedFilename[0]+uuid()+"."+splittedFilename[splittedFilename.length - 1]
            thumbnail.mv(path.join(__dirname,"..",'uploads',newFilename),async(err)=>{
                if(err){
                    return next(new HttpError(err))
                }
            })
            updatedPost=await Post.findByIdAndUpdate(postId,{title,category,description,thumbnail:newFilename},{new:true})
        }
        if(!updatedPost){
            return next(new HttpError("couldn't update post",400))
        }
        res.status(200).json(updatedPost)
    } catch (error) {
        return next(new HttpError(error))
    }fetchAndUpdateAuthors();
}



//=====================DELETE A POST===========
// POST : api/posts/:id
//PROTECTED

const deletePost=async (req,res,next)=>{
    try {
        const postId=req.params.id;
        if(!postId){
            return next(new HttpError("Post unavailable",400))
        }
        const post=await Post.findById(postId);
        const fileName=post?.thumbnail;
        if(req.user.id == post.creator){
        // delete thumbnail from uploads to folder
        fs.unlink(path.join(__dirname,'..','uploads',fileName),async(err)=>{
            if(err){
                return next(new HttpError(err))
            }else{
                await Post.findByIdAndDelete(postId);
                // find user and reduce post count by 1
                const currentUser=await User.findById(req.user.id);
                const userPostCount=currentUser?.posts-1;
                await User.findByIdAndUpdate(req.user.id,{posts:userPostCount})
                res.json(`Post ${postId} deleted successfully`)
            }
        })
    }else{
        return next(new HttpError("Post couldn't be deleted",403))
    }
    } catch (error) {
        return next(new HttpError(error))
    }fetchAndUpdateAuthors();
}



module.exports={createPost,getPosts,getPost,getCatPosts,getUserPosts,editPost,deletePost}