const dashboard = require("./dashboard.route");
const product = require("./product.route");
const productCategory = require("./product-category.route");
const roles = require("./roles.route");
const system = require("../../config/system");
module.exports = (app) => {
  app.use(system.prefixadmin + "/dashboard", dashboard);
  app.use(system.prefixadmin + "/product-category", productCategory);
  app.use(system.prefixadmin + "/products", product);
  app.use(system.prefixadmin + "/roles", roles);
};
