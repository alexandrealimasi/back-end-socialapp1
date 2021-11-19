const Follow=require("../Models/flollowModel");
const User=require("../Models/userModel");
const mongoose= require("mongoose");

module.exports.follow=async(req,res)=>{
try {
    
const follow=Follow({
    id: mongoose.Types.ObjectId(),
    follower_id:req.decoded._id,
    followed_id:req.body.followed_id
});
await follow.save()
res.status(200).json({follow:follow})

} catch (error) {
    res.send(error)
}
}
module.exports.followers=async(req,res)=>{
    try {
        const followers=await Follow.find({follower_id:req.decoded._id}).populate("followed");
        res.status(200).json({followers:followers})
    } catch (error) {
        res.send(error)
    }
    
}
module.exports.followeds=async(req,res)=>{
    try {
        const followeds=await Follow.find({followed_id:req.decoded._id}).populate("follower");
        res.status(200).json({followeds:followeds})
    } catch (error) {
        res.send(error)
    }
    
}