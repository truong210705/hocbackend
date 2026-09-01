const dashboard = require("./dashboard.route");
const system = require("../../config/system");
module.exports = (app) => {
  app.use(system.prefixadmin + "/dashboard", dashboard);
};
