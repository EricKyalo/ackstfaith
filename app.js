const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const ejs = require("express-ejs-layouts");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const methodOverride = require("method-override")
const flash = require("connect-flash")


// activating express
const app = express();


// body-parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

// method override
app.use(methodOverride("_method"))

// setting up sessions
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    cookie: { 
		secure: true,
		maxAge: 60000 
	}
  }));
  app.use(flash());

// setting up ejs & Layouts
app.use(ejs)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("layout", path.join(__dirname, "views/layouts/main"));



// setting up static files (imgs, css, js)
app.use(express.static(path.join(__dirname, "public")))

// routes middleware
// index router home page
app.use("/", require("./server/routes/index"));



const port = process.env.PORT || 5000;

app.listen(port, () =>{
    console.log(`Listening to port ${port}`)
});