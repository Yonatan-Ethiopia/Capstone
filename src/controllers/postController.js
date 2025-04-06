const posts = require(./src/models/posts);

const getPost = async (req, res)=>{
    try{
        const allPosts = await posts.find().populate(' author', 'username email');
        res.status().json({allPosts})
    }catch(err){
        
    }
}

const addPost = async (req, res,)=>{
    const {title, content, category} = req.body;
    if (!title || !content || !category) {
        return res.status(400).json({ message: 'Title,content and category are required.' });
}

    const author = req.user.id;
    try{
        const newPost = await posts.create( {title, content, category, author});
        res.json({message: 'Success', post: newPost });
    }catch(err){
        res.json({message: 'Unsuccessfull'});
    }
}

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
        if(content) post.content = content;
        if(category) post.category = category;
        const updatedPost = await post.save();
        res.status(200).json(updatedPost);
    }catch(err){
        
        res.status(401).json({message: 'Error'});
    }


}

const deletePost = async (req, res)=>{
    try{
        const userId = req.user;
        const postId = req.params.id;
        const post = await posts.findById(postId);
        if(!post) return res.status(404).json({message: 'Post not found'});
        if(userId.toString() !== post.author.toString()){
            return res.status(401).json({message: 'unauthorized'});
        }
        await post.remove();
        res.status(200).json({ message: 'Post deleted successfully' });
     }catch(err){
        res.status(405).json({message: 'Server Error'});
    }
}


module.exports = { getPost, addPost, updatePost, deletePost }
