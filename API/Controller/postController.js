const Post_Model = require('../Model/Post')





async function handleUserPost (req, res) { 

        const id = req.user.id;  
    
        const userPost = await Post_Model.find({author: id}).populate("author", "name");
        
        res.status(200).json(userPost)
    
}





async function handleAllPost (req, res) {

    const allPost = await Post_Model.find({}).populate('author', 'name');

    res.status(200).json(allPost);
}





async function handleSinglePost (req, res) {
    
        const Id = req.params.id
    
        const onePost = await Post_Model.findById(Id).populate("author", "name")
    
        res.status(200).json(onePost)
}







module.exports = {
    handleUserPost,
    handleAllPost,
    handleSinglePost,
}