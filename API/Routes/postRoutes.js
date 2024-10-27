const express = require("express");
const multer  = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' })
const fs = require('fs');
const Post_Model = require("../Model/Post")
const checkAuth = require('../Middleware/checkAuth');
const {handleUserPost, handleAllPost, handleSinglePost } = require('../Controller/postController')


const router = express.Router();







router.post("/create-post", checkAuth , uploadMiddleware.single('files'), async (req, res) => {

  
    const {originalname, path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length -1];
    const newPath = path + '.' + ext
    fs.renameSync(path, newPath);

    const {title, summary, content} = req.body;

    const userPost = await Post_Model.create({
        title: title,
        summary: summary,
        content: content,
        cover: newPath,
        author: req.user.id,
    })



    res.status(201)
       .json({ message: " Post Successfully Created", 
               status: true});
    
});








router.get("/user-posts", checkAuth, handleUserPost)
    



router.get("/all-post", handleAllPost)




router.get("/post/:id", handleSinglePost) 







module.exports = router;