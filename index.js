require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const route = require("./router/clients/index.router");
const routeAdmin = require("./router/admin/index.route");
const database = require("./config/database");
const system = require("./config/system");
database.connect();
app.locals.prefixAdmin = system.prefixadmin;
app.set("views", "./views");
app.set("view engine", "pug");
app.use(express.static("public"));
route(app);
routeAdmin(app);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
