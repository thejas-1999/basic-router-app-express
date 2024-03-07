const express = require("express");

const app = express();

const route = require("./router");

const PORT = process.env.PORT || 3000;

app.use("/api", route);

//home route
app.get("/", (req, res) => {
  res.end(`Route App`);
});

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
