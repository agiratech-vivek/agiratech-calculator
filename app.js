const path = require("path");
const db = require('./data/database');
const express = require("express");

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', function(request, response){
    // const filePath = path.join(__dirname, 'views', 'index.html');
    // response.sendFile(filePath);
    response.render('index');
});

app.post('/submit', async function(request, response){
    const user = request.body.username;
    console.log(user);

    response.json({});
});

app.use(function(request, response){
    response.render('404');
});

app.use(function(error, request, response, next){
    response.render('500');
});

app.listen(4000);