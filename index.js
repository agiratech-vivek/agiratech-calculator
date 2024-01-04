const path = require("path");

const express = require("express");

const app = express();
app.use(express.static('public'));

app.get('/', function(request, response){
    const filePath = path.join(__dirname, 'views', 'index.html');
    response.sendFile(filePath);
});

app.post('/', function(request, response){

});

app.listen(4000);