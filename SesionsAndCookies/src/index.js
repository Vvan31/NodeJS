
const express = require('express');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');


const app = express();
const oneDay = 1000 * 60 * 60 * 24;

app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));
// parsing the incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use css
app.use(express.static(__dirname + "/public"));

// cookie parser middleware
app.use(cookieParser());

// Session Variables
//username and password
const myusername = 'user1'
const mypassword = 'mypassword'

// a variable to save a session
var session;
// If theres a cookie, then the user is logged in
// If not, then the user is not logged in
app.get('/',(req,res) => {
    session=req.session;
    if(session.userid){
        res.send("Welcome User <a href=\'/logout'>click to logout</a>");
    }else
    res.sendFile('views/index.html',{root:__dirname})
});

app.post('/user',(req,res) => {
    if(req.body.username == myusername && req.body.password == mypassword){
        session=req.session;
        session.userid=req.body.username;
        console.log(req.session)
        res.send(`Hey there, welcome <a href=\'/logout'>click to logout</a>`);
    }
    else{
        res.send('Invalid username or password');
    }
})
app.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});

// PORT
const PORT = 3000;

app.listen(PORT, () => {
   console.log(`Server is running on PORT: ${PORT}`);
});
