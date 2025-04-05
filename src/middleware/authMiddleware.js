const jwt = require('jsonwebtoken');
const blackList = require('blacklist');
const autherization= (req,res, next)=>{
    const auth= req.headers['autherization'];
    if(!auth){
        console.log('Empty token');
        return res.status(401).json({message: 'Token Invalid'});
    }
    const token= auth.split(' ')[1];
    if(!token){
        console.log('Invalid token');
        return res.status(403).json({message: 'Invalid token'});
    }
    const blackListed = blacklist.findOne(token);
    if(blackListed){
        console.log('Token is blacklisted');
        return res.status(400).json({message: 'Blacklisted token'});
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
            if(err){
                console.log('token doesnt match');
                return res.status(401).json({message: 'Unsuccess full'});
            }
            req.user=user;
            next();
    })
};

module.exports= authorization;