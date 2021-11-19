const Conversation=require('../Models/Conversation');

//====================create conversation=====================
module.exports.createConversation=async(req,res)=>{
 
 const conversation= new Conversation({
     members:[req.decoded._id,req.body.receverId]
 });
 try {
  const newconversation= await  conversation.save();
    res.status(200).json({conversation:newconversation});
    console.log(conversation);
 } catch (error) {  
     res.send(error)
 }
}

//=============================get conversation in order of last message ===================
module.exports.getconversation=async(req,res)=>{
   try {
    const conversation=await Conversation.find({members:{$in:[req.decoded._id]}})
    .populate('members','name postname picture phone').populate({
        path: 'lastMessage',
            options:{
                sort: {
                    createdAt:-1
                }
            },
            populate: {
                path: 'sender',
                select: 'name picture'
            }
    });

    res.status(200).json({conversations:conversation})
   } catch (error) {
       res.json(error)
   }
};



module.exports.getconversationAll=async(req,res)=>{
    try {
     const conversation=await Conversation.find({members:{$in:[req.decoded._id]}})
     .populate('members','name postname picture phone').populate('message');
 
     res.status(200).json({conversations:conversation})
    } catch (error) {
        res.json(error)
    }
 };
 

//=========================get messages from conversation==================
module.exports.getmessages=async(req,res)=>{
    try {
        const conversation=await Conversation.find({members:{$in:[req.decoded._id]}}).populate('members');
        res.status(200).json({conversations:conversation});
    } catch (error) {
        res.json(error)
    }
}