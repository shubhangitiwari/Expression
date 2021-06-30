const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');
const router = express.Router();

require('../db/conn');
const User = require('../model/userSchema');
const { findOneAndUpdate } = require('../model/userSchema');

router.get('/', (req,res) => {
    res.send(`Hello world from the router server`);
})

//to get the data from the registration page/form
//using promises
router.post('/register', (req,res) => {
    const { name, email, phone, profession, password, cpassword } = req.body;

    //if any field is empty
    if( !name || !email || !phone || !profession || !password || !cpassword )
    {
        return res.status(422).json({error : "Please fill all the details properly..!"});
    }

    User.findOne({email : email}).then((userExist) => {

        //if user already exist then return error
        if(userExist)
           return res.status(422).json({error : "User already exists."});
        else if(password != cpassword)
           return res.status(422).json({error : "Password doesnt match."});

        //else acquire all the fields and save the data into the database
        const user = new User({name, email, phone, profession, password, cpassword});

        user.save().then(() => {
            res.status(201).json({message : "User added successfully."});
        }).catch((err) => res.status(500).json({error : "User could not be added."}));
    }).catch((err) => { console.log(err); });
})

//login credentials validation using async await
router.post('/login', async (req,res) => {
    try{
        const {email, password} = req.body;
        if(!email || !password)
           return res.status(400).json({message : "Please fill all the fields."});

        const userLogin = await User.findOne({email : email});
        const token = await userLogin.generateAuthToken();

        res.cookie("jwtoken", token, {
            expires : new Date(Date.now() + 25892000000),
            httpOnly : true
        })

        if(userLogin)
        {
            const isMatch = await bcrypt.compare(password, userLogin.password);
            if(isMatch)
               return res.status(410).json({message : "User Login Successfull."});
            else  
               return res.status(400).json({error : "Invalid credentials."});
        }
         else
           return res.status(400).json({error : "User not found."});

    }catch(err){
        console.log(err);
    }
})

router.get('/about',authenticate, async(req,res) => {
    res.send(req.rootUser);
})

router.post('/about', async (req,res) => {
    try{
       const {title,article} = req.body;
       console.log(article, title);
       var articles = {title,article};
       const token = req.cookies.jwtoken;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

        const rootUser = await User.findOne({_id : verifyToken._id, "tokens.token" : token});

       if(!rootUser)
          console.log("User not found");
       User.findOneAndUpdate({_id: verifyToken._id}, {$push: {articles: articles}},{upsert : true},(err, doc) => {
        if (err) {
            console.log("Something wrong when updating data!");
            res.status(402).json({error : "Not done"});
        }
        else{
        console.log(doc + "success");
        res.status(400).json({message : "Updated"});
        }
    });
    }catch(err){
        console.log(err);
    }
})

module.exports = router;