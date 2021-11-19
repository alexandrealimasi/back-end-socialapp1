const router=require("express").Router();
const multer=require('multer');
const userController=require("../Controllers/userController");
const postController=require("../Controllers/postController");
const commentController=require("../Controllers/comments");
const followController=require("../Controllers/followController")
const middleware = require("../Middleware/middleware");
const ConversationsController=require("../Controllers/conversationController")
const MessageController=require("../Controllers/messageController")
const PostCategory=require("../Controllers/postCategory")
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'uploads');
    },
    filename: function(req,file,cb){
        var datenow = new Date().toISOString();
        var newfilename = datenow.replace(/:|\./g,'-');
        cb(null,newfilename+'_'+file.originalname);
    }
});

const fileFilter = (req,file,cb) => {
    if(file.mimetype === 'image/jpeg' ||file.mimetype === 'image/jpg' || file.mimetype === 'image/png'){
        cb(null,true);
    }else{
        cb(new Error('the file format is not allowed'),false);
    }
};

const updload = multer({ 
    storage: storage,
     limits:{
            fileSize:  1024*1024*6
        },
    fileFilter: fileFilter
});

//===============User==============
router.post("/register",updload.single('picture'),userController.create);
router.get("/profile",middleware.checktoken,userController.AuthProfile);
router.post("/login",userController.Login);
router.get("/showallusers",middleware.checktoken,userController.showallusers)
router.patch('/update',middleware.checktoken,userController.updateduser);
router.get('/otherUser',middleware.checktoken,userController.otherUser);

//=================Post=====================================
router.post("/posts",[ updload.single("picture"), middleware.checktoken],postController.createpost);
router.get("/getposts",middleware.checktoken,postController.showallpost);
router.get("/mypost",middleware.checktoken,postController.myPost);
//========================PostCategory========================
router.post("/postcategory",middleware.checktoken,PostCategory.creategategory)
//========================Comments===========================
router.post('/comments',middleware.checktoken,commentController.createComment);

//=============================follow=========================================
router.post("/follow",middleware.checktoken,followController.follow);
router.get("/followers",middleware.checktoken,followController.followers);
router.get("/followeds",middleware.checktoken,followController.followeds);

//=============================Conversation=====================================
router.post("/conversation/create",middleware.checktoken,ConversationsController.createConversation);
router.get("/conversation/get",middleware.checktoken,ConversationsController.getconversation);
router.get("/conversation/getall",middleware.checktoken,ConversationsController.getconversationAll);
router.get("/conversation/convert",middleware.checktoken,ConversationsController.getmessages);
//=====================================Message=========================================================

router.post("/message/create",middleware.checktoken,MessageController.createMessage);
router.get("/message/get/:conversationId",middleware.checktoken,MessageController.getmessage);

router.post("/message/add/:conversationId",middleware.checktoken,MessageController.addMessage);


module.exports=router;