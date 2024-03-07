const express = require("express");
const bodyparser = require("body-parser");

const app = express();

const route = require("./router");

const PORT = process.env.PORT || 3000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use("/api", route);

//home route
app.get("/", (req, res) => {
  res.end(`Route App`);
});

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
