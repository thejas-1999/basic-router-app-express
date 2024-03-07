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

// Get account by id(routing parameters)
route.get("/accounts/:id", (req, res) => {
  const parseId = parseInt(req.params.id);
  const getAccount = accounts.find((account) => account.id === parseId);

  if (!getAccount) {
    res.status(404).send("Account not found");
  } else {
    res.json({ userData: [getAccount] });
  }
});

// PUT request
route.put("/accounts/:id", (req, res) => {
  const {
    body,
    params: { id },
  } = req;

  const parseId = parseInt(id);

  if (isNaN(parseId)) return res.status(400).send(`Invalid Id`);

  const findUserId = accounts.findIndex((account) => account.id === parseId);

  if (findUserId === -1) return res.status(404).send(`User not found`);

  accounts[findUserId] = { id: parseId, ...body };
  return res.sendStatus(200);
});

// PATCH request
route.patch("/accounts/:id", (req, res) => {
  const {
    body,
    params: { id },
  } = req;

  const parseId = parseInt(id);

  if (isNaN(parseId)) return res.status(400).send(`Invalid Id`);

  const findUserId = accounts.findIndex((account) => account.id === parseId);

  if (findUserId === -1) return res.status(404).send(`User not found`);

  accounts[findUserId] = { ...accounts[findUserId], ...body }; // Merge the existing account with the new data
  return res.sendStatus(200);
});

// DELETE request
route.delete("/accounts/:id", (req, res) => {
  const {
    params: { id },
  } = req;

  const parseId = parseInt(id);

  if (isNaN(parseId)) return res.status(400).send(`Invalid Id`);

  const index = accounts.findIndex((account) => account.id === parseId);

  if (index === -1) return res.status(404).send(`User not found`);

  accounts.splice(index, 1); // Remove the account from the array
  return res.sendStatus(204); // No Content
});

module.exports = route;
