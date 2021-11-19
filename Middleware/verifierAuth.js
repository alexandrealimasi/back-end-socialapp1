const jwt=require('jsonwebtoken');

module.exports = function check(req, res, next){
    const header = req.header('token');
    if(!header) res.status(403).json({ "message": "no token" });

    try{
        const verified = jwt.verify(header, process.env.TOKEN_SECRET);
        req.connectedUser = verified;
        next();
    }catch(error){
        res.status(500).json(error)
    }
}