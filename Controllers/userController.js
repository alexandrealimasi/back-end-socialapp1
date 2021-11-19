const User=require("../Models/userModel");
const bcrypt=require('bcryptjs');
require('express');
const jwt=require('jsonwebtoken');
const { $where } = require("../Models/userModel");

//============Regisrer===============================================
module.exports.create=async(req,res)=>{
    const salt= bcrypt.genSaltSync(10);
    const hashpassword= bcrypt.hashSync(req.body.password,salt);
  const user= User({
      name:req.body.name,
      postname:req.body.postname,
      gender:req.body.gender,
      age:req.body.age,
      country:req.body.country,
      phone:req.body.phone,
      username:req.body.username,
      password:hashpassword,
      picture:req.file?.path ?? '',
  })
  try {
      const savedData = await user.save();
      res.status(200).json({
          user: savedData
      })
  } catch (error) {
      res.send(error+"err");
  }
};

//==================Get User Prolfile =======================
module.exports.AuthProfile=(req, res) => {
       User.findById(req.decoded._id, (err, result) => {
        if (err) { return res.send('err').json({ msg: err }) }
        
        if (result===null) {
            return res.status(404).json({msg:"not found"})
        }
        else{
            return res.status(200).json({
                user: result,
                msg: "susscess"
            });
        
        }
            
    })
}
//=========================Update User==========================

   module.exports.updateduser =async (req,res)=>{
       //console.log(req.decoded._id);
     let uuid = req.decoded._id;
     try{
        console.log(typeof(uuid));
        let user = await User.updateOne({_id: uuid},{
            $set:
            {   name:req.body.name,
                postname:req.body.postname,
                gender:req.body.gender,
                age:req.body.age,
                country:req.body.country,
                phone:req.body.phone
            }
        });

       return  res.status(200).json({user:user});
       
     } catch (error) {
        res.send(error);
     }   
   
};
//=========================Show all user==========================================
module.exports.showallusers=async(req,res)=>{

let user=await User.find( { _id: { $ne: req.decoded._id} } );

return res.status(200).json({users:user})
    
}

//==============================Show athor user to conversate ======================
module.exports.otherUser=(req,res)=>{
    let users=User.find(!{_conversationId:{$ne:req.decoded.conversationId}});
    return res.status(200).json({users:users});
}
//==================================Login==========================================
    module.exports.Login=async (req,res)=>{
    
        try {
            console.log(req.body);
            await User.findOne({username:req.body.username},async (err, result)=>{
                if(err) {return res.status(404).send('err').json({msg:err})};

                if(result === null) { return res.status(404).json({msg:"user not found"}); }
                let validPass = bcrypt.compareSync(req.body.password, result.password);
                if(!validPass) { return res.status(403).json({msg:"password incorrect"}); }
                const token = jwt.sign({_id: result.id}, process.env.TOKEN_SECRET);
                res.status(200).json({
                    token:token,
                    uuid: result.id,
                    msg:"success"
                });
    
            })
        } catch (error) {
            return error;
        }
        };
    