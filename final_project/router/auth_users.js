const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
//let users = []; // from Exercise 6

regd_users.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }
  if (!isValid(username) || !authenticatedUser(username,password)) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ username }, "your_secret_key", { expiresIn: "1h" });
  req.session = { username }; // if using express-session
  return res.status(200).json({ message: "Login successful", token });
});


// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const { username } = req.session;
  if (!username) return res.status(401).json({ message: "User not logged in" });
  
  const isbn = req.params.isbn;
  const review = req.query.review; // or `req.body.review`
  if (!books[isbn]) return res.status(404).json({ message: "Book not found" });

  books[isbn].reviews[username] = { username, review };
  return res.status(200).json({ message: "Review added/updated", reviews: books[isbn].reviews });
});



module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
