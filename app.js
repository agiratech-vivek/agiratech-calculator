const path = require("path");

const express = require("express");

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

app.get('/', function(request, response){
    // const filePath = path.join(__dirname, 'views', 'index.html');
    // response.sendFile(filePath);
    response.render('index');
});

app.post('/', function(request, response){

});

app.listen(4000);