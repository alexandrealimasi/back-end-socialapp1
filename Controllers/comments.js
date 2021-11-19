const mongoose = require('mongoose')
const comments=require('../Models/comments')
const User=require("../Models/userModel")

module.exports.createComment=(res,req)=>{
    const user=User.findById(req.decoded._id);
const comment=comments({
    id: mongoose.Types.ObjectId(),
    user:user,
    comment:req.body.comment,
    date:req.body.date
})
try {
    comment.save();
    res.status(200).json({msg:comment})
} catch (error) {
    res.send(error)
}
}