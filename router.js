const express = require("express");
const route = express.Router();
const accounts = require("./database");

//Get request

route.get("/accounts", (req, res) => {
  res.json({ userData: accounts });
});

//Post request

route.post("/accounts", (req, res) => {
  const incomingAccounts = req.body;
  accounts.push(incomingAccounts);
  res.json(accounts);
});

// Get account by id
route.get("/accounts/:id", (req, res) => {
  const parseId = parseInt(req.params.id);
  const getAccount = accounts.find((account) => account.id === parseId);

  if (!getAccount) {
    res.status(404).send("Account not found");
  } else {
    res.json({ userData: [getAccount] });
  }
});

module.exports = route;
