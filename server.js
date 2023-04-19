require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 3000;
const session = require('express-session');
const public_routes = require('./controllers/publicController');
const auth_routes = require('./controllers/authController');
const private_routes = require('./controllers/userController');
const { engine } = require('express-handlebars');
const db = require('./config/connection');

const app = express();

app.engine('hbs', engine({
  extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use('/', [public_routes, auth_routes, private_routes]);

db.sync().then(() => {
  app.listen(PORT, () => console.log('Server started on port %s', PORT))
});



// // imported required dependecies
// require('dotenv').config();
// const express = require("express");

// const dotenv = require("dotenv");
// const bodyParser = require("body-parser");
// const session = require("express-session");
// const PORT = process.env.PORT || 3000;
// // const cookieParser = require("cookie-parser");
// const models = require("./models"); //Imported sequelize models
// const db = require('./config/connection');
// // const { url } = require("inspector");
// const public_routes = require('./controllers/publicController');
// const auth_routes = require('./controllers/authController');
// const private_routes = require('./controllers/userController');
// const {engine} = require("express-handlebars");



// //init instance of express app
// const app = express();
// //config handlebars
// app.engine('hbs', engine({
//     extname: '.hbs'
//   }));
//   app.set('view engine', 'hbs');
//   app.set('views', './views');


// // config app to use middleware
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(express.static("public"));

// //set up bodyParser to parse incoming req data
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// //set up cookieParser to parse cookies from the client's cookie header
// // app.use(cookieParser());

// //set up express-session for session management and auth
// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false
//   }));


// //import routes

// app.use('/', [public_routes, auth_routes, private_routes]);

// db.sync().then(() => {
//   app.listen(PORT, () => console.log('Server started on port %s', PORT))
// });