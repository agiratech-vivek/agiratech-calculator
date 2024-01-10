const path = require("path");

const express = require("express");

const db = require('./data/database');
const demoRoutes = require('./routes/demos');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(demoRoutes);

// app.use(function (request, response) {
//     response.render("404");
//   });
  
//   app.use(function (error, request, response, next) {
//     response.render("500");
//   });

app.listen(4000);