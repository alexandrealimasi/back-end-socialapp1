const mongoose=require('mongoose');

const schema=mongoose.Schema({
username:{
    type:String,
    require:true
},
picture:{
    type:String,
    require:true
}
});
module.exports=mongoose.Schema("album",schema);