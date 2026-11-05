const dashboard = require("./dashboard.route");
const product = require("./product.route");
const productCategory = require("./product-category.route");
const roles = require("./roles.route");
const authMiddleWare = require("../../middleware/admin/auth.middleware");
const accounts = require("./accounts.route");
const auth = require("./auth.route");
const system = require("../../config/system");
module.exports = (app) => {
  app.use(
    system.prefixadmin + "/dashboard",
    authMiddleWare.authRequire,
    dashboard,
  );
  app.use(
    system.prefixadmin + "/product-category",
    authMiddleWare.authRequire,
    productCategory,
  );
  app.use(
    system.prefixadmin + "/products",
    authMiddleWare.authRequire,
    product,
  );
  app.use(system.prefixadmin + "/roles", authMiddleWare.authRequire, roles);
  app.use(
    system.prefixadmin + "/accounts",
    authMiddleWare.authRequire,
    accounts,
  );
  app.use(system.prefixadmin + "/auth", auth);
};
