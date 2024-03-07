const express = require("express");
const route = express.Router();
const accounts = require("./database");

//Get request

route.get("/accounts", (req, res) => {
  res.json({ userData: accounts });
});

module.exports = route;
