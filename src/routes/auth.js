const express= require('express');
const bycrypt= require('bcrypt');
const jwt = require('jsonwebtoken');
const authorization = require('/src/middleware/authorization');
const blacklist = require('/src/middleware/blackList');
const app= express();
const port = 3000;
let Users = [ ];

app.use(express.json())
app.post('/api/auth/register', (req,res)=>{
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
});

app.post('/api/auth/login' , async (req,res)=>{
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
});

app.post('/api/auth/logout', authorization, blackList, (req, res)=>{
    
    res.json({message: 'Success'});
})
app.listen(port, ()=>{
    console.log('Running');
})
