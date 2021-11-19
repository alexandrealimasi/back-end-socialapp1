const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const shema=Schema({
    
    user:{
      type:Schema.Types.ObjectId,
      ref:'User'
    },
    user:{
        type:Schema.Types.ObjectId,
    },
    post:{
        type:Schema.Types.ObjectId,
        ref:'Post'
    },
    comment:{
        type:String,
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

module.exports=mongoose.model('comment',shema);