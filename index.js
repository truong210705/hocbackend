require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const route = require("./router/clients/index.router");
const database = require("./config/database");
database.connect();

app.set("views", "./views");
app.set("view engine", "pug");
app.use(express.static("public"));
route(app);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
