const mongoose=require("mongoose");
const schema=mongoose.Schema({
    
    conversationId:{
        type:mongoose.Schema.Types.ObjectId
    },
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    message:{
        type:String
    }, 
},
 {timestamps:true}
)

module.exports=mongoose.model("message",schema);