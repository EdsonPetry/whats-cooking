// imported required dependecies
const express = require("express");
const exphbs = require("express-handlebars");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const db = require("./models"); //Imported sequelize models
const { url } = require("inspector");

//init dotenv
dotenv.config();

//init instance of express app
const app = express();

// config app to use middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//set up bodyParser to parse incoming req data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//set up cookieParser to parse cookies from the client's cookie header
app.use(cookieParser());

//set up express-session for session management and auth
app.use();

//config handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//import routes
const apiRoutes = require("./routes/apiRoutes");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const threadRoutes = require("./routes/threadRoutes");
const responseRoutes = require("./routes/responseRoutes");

app.use("/api", apiRoutes);
app.use("/", userRoutes);
app.use("/", categoryRoutes);
app.use("/", threadRoutes);
app.use("/", responseRoutes);
//init server to listen to port 3000
const PORT = process.env.PORT || 3000;

//synce sequelize models + start server
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
