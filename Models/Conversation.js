const mongoose=require("mongoose");
const Schema = mongoose.Schema;
const schema=Schema({
    
    members:[{
       
            type: Schema.Types.ObjectId,
            ref: 'User'
    }]
    
},
 {timestamps:true}
);
schema.virtual('lastMessage', {
    ref:"message",
    localField: "_id",
    foreignField: "conversationId",
    justOne: true
})
schema.set('toObject',{virtuals:true})
schema.set('toJSON',{virtuals:true})

module.exports=mongoose.model("conversation",schema);