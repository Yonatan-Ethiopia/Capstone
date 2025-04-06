c9nst users = require(.src/models/users');
const blacklist = require('./src/models/blacklist')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res)=>{
    const { email, username ,password } = req.body;
    //Wether the form is empty or not will be checked by the frotend
    const presentE=  Users.find( u=> u.email === email);
    const presentU=  Users.find( u=> u.username === username);
    if(!presentE && !presentU){
        hashedPassword = bycrypt.hash(password,10);
        const newUser = { email, username , hashedpPassword }
        Users.push(newUser);
        res.json({ message: 'Success'}).status(201);
        console.log('Register succesfull');
    }
    else {
        res.json({ message: 'Unsuccessfull'}).status(400);
        console.log('User already exists');
    }
}

const login = async (req, res)=>{
    const {email, password}= req.body;
    const isAvailable= Users.find( u=> u.email===email);
    if(isAvailable){
        const validPass= await bcrypt.compare(password , isAvailable.password);
        if(!validPass){
            res.status(400).json({ message: 'Invalid password'});
            console.log('Password mismatch');
        }
        else{
            const token= jwt.sign(
                { email: isAvailable.email , username : isAvailable.username },
                process.env.JWT_SECRET,
                { expiresIn: '24h' });
                if(!process.env.JWT_SECRET){
                    res.status(401).res.json({message: 'token not found'});
                    console.log('Token not found')
                }
            res.json({message: 'Success', token});
            console.log('login succesfull');
        }
    }
    else{
        res.status(400).json({ message: 'User doesnt exist'});
        console.log('User doesntn exist');
    }
}

const logout = async (req, res)=>{ 
    const auth= req.headers['authorization'];
    const token = auth.split(' ')[1];
    const decoded = req.user;
    const lifetime = decode.exp - decoded.iat;
    const expire = new Date( Date.now() + lifetime*1000 );
    try {
       await blacklist.create( token , expire );
    }
    catch(err){
        res.json({message: 'Unsuccessfull'});
    }
    
}

module.exports = { register, login, logout}