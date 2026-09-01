const dashboard = require("./dashboard.route");
const product = require("./product.route");
const system = require("../../config/system");
module.exports = (app) => {
  app.use(system.prefixadmin + "/dashboard", dashboard);
  app.use(system.prefixadmin + "/products", product);
};
