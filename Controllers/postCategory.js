const PostCaregoryModel=require('../Models/PostCategoryModel');



module.exports.creategategory=async(req,res)=>{
 var category=PostCaregoryModel(req.decoded._id,req.body.category);
 category.save();
 try {
     res.status(200).json(category);
 } catch (error) {
    req.send(error);
 }
}