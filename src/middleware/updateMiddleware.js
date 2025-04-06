const posts = require('./src/models/posts');

const updatePost = async (req, res,)=>{
    try{
        const userId = req.user.id ;    //this is the id for the user requiestin the  update
        const postId= req.params.id ;    //this is the id for that specific post
        const post = await posts.findById(postId);
        if(!post) return res.status(401).json({message: 'post doesnt exist'});
        const author = post.author ;
        if(post.author.toString() !== userId.toString()) return res.json({message: 'unauthoriazed user'});
        const { title, content, category} = req.body;
        if(title) post.title = title;
        if(content) post.content = content:
        if(category) post.category = category;
        const updatedPost = await post.save();
        res.status(200).json(updatedPost);
    }catch(err){
        
        res.status(401).json({message: 'Error'});
    }


}