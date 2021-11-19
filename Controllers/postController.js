const mongoose= require('mongoose');
const Post = require('../Models/postMosel');
const User=require("../Models/userModel");


//===================Create post===========================
module.exports.createpost=async(req,res)=>{
console.log(req.body)
    const user = await User.findById(req.decoded._id);
   
    try {

        let post = Post({
            id: mongoose.Types.ObjectId(),
            user: user,
            title:req.body.title,
            picture:req.file?.path ?? '',
            description:req.body.description
        },);
        
       await post.save();
        res.status(200).send(post)
    } catch (error) {
        res.send(error)
    }
}

//=======================Show all Post===================
module.exports.showallpost=async(req,res)=>{
    
    try {
        const post=await Post.find().populate('user');
        if(!post){
            return res.status(404).json({msg:"not found"})
        }else{
            return res.status(200).json({post:post});
        }
    } catch (error) {
        return res.send(error);
    }
    
}

//=========================Show mypost=======================

module.exports.myPost=async(req,res)=>{
  const user=User.findById(req.decoded._id);
    try{  
         let mypost= await Post.find().populate(User.findById(user));
      if(!mypost){
          return res.status(404).json({msg:"not found"})
      }else{
          return res.status(200).json({mypost:mypost})
      }
    }catch(err){
        return res.send(err);
    }
}