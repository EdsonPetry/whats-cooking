require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT || 3000;
const session = require("express-session");
const public_routes = require("./controllers/publicController");
const auth_routes = require("./controllers/authController");
const private_routes = require("./controllers/userController");
const thread_routes = require("./controllers/threadController");
const { engine } = require("express-handlebars");
const db = require("./config/connection");

const app = express();

app.engine(
  "hbs",
  engine({
    extname: ".hbs",
  })
);
app.set("view engine", "hbs");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/", [public_routes, auth_routes, private_routes, thread_routes]);

db.sync().then(() => {
  app.listen(PORT, () => console.log("Server started on port %s", PORT));
});
