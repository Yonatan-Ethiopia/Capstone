const posts = require(./src/models/posts);

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

module.exports = addPost;
