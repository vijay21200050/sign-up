const express  = require('express')
const app = express()

const jsonParser = require('body-parser').json()
const bcrypt = require('bcrypt')
const jwt  = require('jsonwebtoken')
const userExist = require('./utility')

var UserData = []
const token_key = 'mysecret';


app.post('/register',jsonParser,(req,res)=>{
    const { username, email, password } = req.body;

    encryptpwd = bcrypt.hashSync(password,10)

    UserData.push({
        'username':username,
        'email':email,
        'password': encryptpwd
    });

    const token = jwt.sign(
        { username: username },
        token_key,
        {
          expiresIn: "2h",
        }
      );

    // Send token back to user

    res.status(200).send({'username':username, 'token': token})

})

app.post('/login',jsonParser,(req,res)=>{
    const { username, password } = req.body;

    if(userExist(UserData,username,password)){
        const token = jwt.sign(
            { username: username },
            token_key,
            {
              expiresIn: "2h",
            }
          );
        res.status(200).send({'username':username,'token':token})
    }
    else{
        res.status(400).send({'message':'Wrong Credentials'})
    }

})


app.listen(3000,()=>{
    console.log("Server listening on port 3000")
})