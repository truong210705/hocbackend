require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const route = require("./router/clients/index.router");
const routeAdmin = require("./router/admin/index.route");
const database = require("./config/database");
const system = require("./config/system");
var cookieParser = require("cookie-parser");
const session = require("express-session");
var flash = require("express-flash");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
database.connect();
app.use(methodOverride("_method"));
//express flash
app.use(cookieParser("abcd2107"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
//end express flash
app.use(bodyParser.urlencoded({ extended: false }));
app.locals.prefixAdmin = system.prefixadmin;
app.set("views", "./views");
app.set("view engine", "pug");
app.use(express.static("public"));
route(app);
routeAdmin(app);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
