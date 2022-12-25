const express = require("express");
const bodyParser = require("body-parser");
const responseHelper = require("express-response-helper").helper();
const cors = require("cors");
const db = require("./app/models");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// attach the middleware before any route definition
app.use(responseHelper);

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my base project." });
});

app.get("/user", async (req, res) => {
  const users = await db.User.findAll();
  res.respond(users, 200);
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
