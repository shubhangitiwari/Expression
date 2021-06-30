const dotenv = require("dotenv");
const express = require('express');
const cookieparser = require('cookie-parser');
const app = express();
app.use(cookieparser());
dotenv.config({path : './config.env'});

require('./db/conn');
const User = require('./model/userSchema');

app.use(express.json());
app.use(require('./route/auth'));

const PORT = process.env.PORT;


app.get('/contact', (req,res) => {
    res.send(`It is the contact me page.`);
})

app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}.`);
})