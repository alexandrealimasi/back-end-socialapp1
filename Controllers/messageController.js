const Message=require('../Models/Message');
const Conversation=require("../Models/Conversation");
//====================Credate a conversation and add message==========================
module.exports.createMessage=async(req,res)=>{
  const conversation= new Conversation({
    members:[req.decoded._id,req.body.receverId]
});
try {
const newconversation= await  conversation.save();

const message=Message({
        conversationId:newconversation._id,
        sender:req.decoded._id,
        message:req.body.message
    });

  
      const newmessage=await message.save();
       res.status(200).json({message:newmessage})
  } catch (error) {
      
  }
}

//======================add message========================
module.exports.addMessage=async(req,res)=>{
  let uuid = req.params.conversationId;
  try {
    const message = new Message({
      conversationId: uuid,
      sender:req.decoded._id,
      message:req.body.message
    });
    const newMessage = await message.save();
      res.status(200).json({message: newMessage});
  } catch (error) {
    res.send(error);
  }
    
}

//=====================get message============================

module.exports.getmessage=async(req,res)=>{
  try {
    const messages=await Message.find({conversationId:req.params.conversationId}).populate('sender','name postname picture');
    res.status(200).json({messages:messages});
  } catch (error) {
      res.json(error);
  }
}

//=======================get all message=====================

