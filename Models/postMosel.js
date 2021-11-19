const mongoose=require('mongoose');
const Schema = mongoose.Schema;


const schema = Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comment:[{
        type:Schema.Types.ObjectId,
        ref:'comment'
    }],
    title:String,
    picture:{
        type:String,
        default:""
    },
    description: {
        type: String
    },
    date:{
        type:Date,
        default:Date.now()
    }

    
});
schema.virtual('Category', {
    ref:"postCategory",
    localField: "_id",
    foreignField: "postId",
    justOne: true
})
schema.set('toObject',{virtuals:true})
schema.set('toJSON',{virtuals:true})

module.exports=mongoose.model("Post", schema);