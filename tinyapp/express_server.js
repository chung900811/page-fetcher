const express = require("express");
const app = express();
const PORT = 8080; 
const getUserByEmail = require("./helpers.js");
const bodyParser = require("body-parser");
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');
const password = "purple-monkey-dinosaur"; 
const hashedPassword = bcrypt.hashSync(password, 10);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

const generateRandomString = function() {
  const p = "abcdefghijklmnopqrstuvwxyz0123456789";
  const startingArray = p.split("");
  let finalArray = [];
  for (let i = 0; i < 6; i++) {
    finalArray.push(startingArray[Math.floor(Math.random() * 36)]);
  }
  return finalArray.join("");
};

app.use(cookieSession({
  name: 'session',
  keys: ["terry"],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

const urlsForUser = function(id) {
  let newDatabase = {};
  const shortKeys = Object.keys(urlDatabase);
  for (let i = 0; i < shortKeys.length; i++) {
    if (urlDatabase[shortKeys[i]].userID === id) {
      newDatabase[shortKeys[i]] = urlDatabase[shortKeys[i]];
    }
  }
  return newDatabase;
}

const urlDatabase = {
  "b2xVn2": { longURL: "http://www.lighthouselabs.ca", Id: "userRandomID" },
  "9sm5xK": { longURL: "http://www.google.com", Id: "userRandomID" },
};

const users = { 
  "userRandomID": {
    id: "userRandomID", 
    email: "user@example.com", 
    password: bcrypt.hashSync("purple-monkey-dinosaur", 10)
  },
 "user2RandomID": {
    id: "user2RandomID", 
    email: "user2@example.com", 
    password: bcrypt.hashSync("dishwasher-funk", 10)
  }
}
app.get("/", (req, res) => {
  res.redirect("/login");
});

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

app.get("/urls/new", (req, res) => {
  if (req.session.user_id === undefined) {
    res.redirect("/login");
  }
  else {
    const templateVars = {
      user_id: req.session.user_id,
    };
    res.render("urls_new", templateVars);
  }
});

app.get("/urls", (req, res) => {
  if (req.session.user_id === undefined) {
    res.redirect("/login");
  }
  else {
    const templateVars = { urls: urlDatabase, user_id: req.session.user_id };
    const userID = templateVars.user_id.id;
    const userDatabase = urlsForUser(userID);
    const newTemplateVars = { urls: userDatabase, user_id: req.session.user_id };
    res.render("urls_index", newTemplateVars);
  }
});

app.get("/urls/:shortURL", (req, res) => {
  const templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL].longURL, user_id: req.session.user_id };
  if (templateVars.user_id !== undefined && templateVars.user_id.id === urlDatabase[req.params.shortURL].userID) {
    res.render("urls_show", templateVars);
  }
  else {
    res.redirect("/login");
  }
});

app.get("/u/:shortURL", (req, res) => {
  const longURL = urlDatabase[req.params.shortURL].longURL;
  res.redirect(longURL);
});

app.get("/register", (req, res) => {
  const templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL], user_id: req.session.user_id };
  res.render("register", templateVars);
});

app.get("/login", (req, res) => {
  const templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL], user_id: req.session.user_id };
  res.render("login", templateVars);
});

app.post("/urls", (req, res) => {
  const templateVars = { shortURL: generateRandomString(), longURL: req.body.longURL, user_id: req.session.user_id };
  const shortURL = templateVars.shortURL;
  urlDatabase[shortURL] = { longURL: templateVars.longURL, userID: templateVars.user_id.id }; 
  res.redirect(`/urls/${templateVars.shortURL}`);        
});

app.post("/urls/:shortURL/delete", (req, res) => {
  const templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL], user_id: req.session.user_id };
  const userID = templateVars.user_id.id;
  const shortURL = templateVars.shortURL;
  if (urlDatabase[shortURL].userID === userID) {
    delete urlDatabase[shortURL];
    res.redirect("/urls");
  }
});

app.post("/urls/:shortURL", (req, res) => {
  const shortURL = req.params.shortURL;
  const newLongURL = req.body.longURL;
  urlDatabase[shortURL].longURL = newLongURL;
  res.redirect("/urls");
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = getUserByEmail(email, users);
  if (!user.password || !user.email) {
    res.status(403).send("403: User does not exist");
  }
  if (bcrypt.compareSync(password, user.password) === true) {
    req.session.user_id = user;
    const templateVars = {
      user_id: req.session.user_id,
    };
    res.redirect("/urls");
  }
  else {
    res.status(403).send("403: Incorrect email or password");
  }
});

app.post("/logout", (req, res) => {
  req.session = null;
  res.redirect("/urls");
});

app.post("/register", (req, res) => {
  const id = generateRandomString();
  let email = req.body.email;
  let password = bcrypt.hashSync(req.body.password, 10);
  const user = {
    id: id,
    email: email,
    password: password
  }
  if (email === "" || password === "") {
    res.status(400).send("400: Please enter your Email or password.");
  }
  else if (getUserByEmail(email, users).email === user.email) {
    res.status(400).send("400: User is already exist.");
  }
  else {
    users[id] = user;
    req.session.user_id = user;
    res.redirect("/urls");
  }
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});

