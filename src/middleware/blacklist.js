const blacklist = require('./src/models/blacklist');

const blackList = async ( req, res, next )=>{
    const auth= req.headers['authorization'];
    const token = auth.split(' ')[1];
    const decoded = req.user;
    const lifetime = decode.exp - decoded.iat;
    const expire = new Date( Date.now() + lifetime*1000 );
    try {
       await blacklist.create( token , expire );
        next();
    }
    catch(err){
        res.json({message: 'Unsuccessfull'});
    }
    
}
module.exports = blackList;
