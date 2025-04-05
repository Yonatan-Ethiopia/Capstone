const posts = require(./src/models/posts);

const addPost = async (req, res, next)=>{
    const title = req.body.title;
    const content = req.body.content;
    const author = req.user.id;
    const id = Date.now();
    try{
        await posts.creatone( title, content, author ,id);
        res.json({message: 'Success'});
    }catch(err){
        res.json({message: 'Unsuccessfull'});
    }
}

module.exports = addPost;