const mongoose=require('mongoose');

var Schema=mongoose.Schema({

     postId:{
        type:mongoose.Schema.Types.ObjectId

     },
    category:{
        type:String
    }
  
})

module.exports=mongoose.model('postCategory',Schema);