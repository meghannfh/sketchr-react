const express = require("express");
const app = express();
var cors = require('cors')
// const bodyParser = require("body-parser")
// const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const methodOverride = require("method-override");// allows us to override the method from POST to PUT or DELETE
const logger = require("morgan");
const connectDB = require("./config/database");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/posts");

//https://www.youtube.com/watch?v=VsUzmlZfYNg use for reference

//Use .env file in config folder
require('dotenv').config({ path: './config/.env' });

// Passport config
// require("./config/passport")(passport);

//connect to Database
connectDB()

// //Handle cors error
app.use(cors())

//Body parsing
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Logging
app.use(logger('dev'))

//Use forms for put / delete
app.use(methodOverride("_method"));

// Setup Sessions - stored in MongoDB
app.use(
    session({
      secret: "keyboard cat",
      saveUninitialized: false,
      resave: false,
      // cookie: { secure: true },
      store: MongoStore.create({ mongoUrl: process.env.DB_STRING_2 }),
    })
  );
  
  // Passport middleware
  app.use(passport.initialize());
  app.use(passport.session());

//Use flash messages for errors, info, etc
// app.use(flash())

//Set up routes for which server is listening
app.use('/user', userRoutes)
app.use('/post', postRoutes)
// app.use('/profilepic', profilepicRoutes)

app.listen(process.env.PORT || PORT, () => {
    console.log(`The server is running`)
})

