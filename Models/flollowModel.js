const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const schema=Schema({
follower_id:{
    type:Schema.Types.ObjectId,
    ref:"User"
},
followed_id:{
    type:Schema.Types.ObjectId,
    ref:"User"
},

});

schema.virtual('followed', {
    ref:"User",
    localField: "followed_id",
    foreignField: "_id",
    justOne: true
})
schema.virtual('follower',{
    ref:"User",
    localField:"follower_id",
    foreignField:"_id",
    justOne:true
})

schema.set('toObject',{virtuals:true})
schema.set('toJSON',{virtuals:true})

module.exports=mongoose.model("follow",schema);

