const mongoose=require('mongoose');
const Schema= mongoose.Schema;

const shema=mongoose.Schema({
    name:{
        type:String,
        
    },
    postname:{
        type:String,
        
    },gender:{
        type:String,
       
    },
    age:{
        type:Number,
    },
    country:{
        type:String,
        
    },
    phone:{
        type:String,
        
    },
    picture:{
        type:String,
        default:""
        
    },
    username:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    posts:{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    comments:{
        type:Schema.Types.ObjectId,
        ref:'comment'
    },
    conversation:{
        type:Schema.Types.ObjectId,
        ref:'conversation'
    },
    message:{
        type:Schema.Types.ObjectId,
        ref:"message"
    }
})
module.exports=mongoose.model("User",shema);