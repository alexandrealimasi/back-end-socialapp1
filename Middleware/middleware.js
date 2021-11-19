const { response } = require('express');
const jwt=require('jsonwebtoken');

const checktoken=(req,res,next)=>{
    // const token = req.param('Authorization');
    const token = req.query.Authorization

    if(!token){
        res.status(401).send('Access denied');
    } else {
        try {
            const decoded = jwt.verify(token.split(" ")[1],process.env.TOKEN_SECRET);
            req.decoded = decoded;
            console.log(decoded);
            next();
        } catch (error) {
            res.send(error);
        }
    }
};

module.exports={
    checktoken:checktoken
}
