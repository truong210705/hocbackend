const systemConfig = require("../../config/system");
const Account = require("../../model/accounts.model");
const Roles = require("../../model/roles.model");
module.exports.authRequire = async (req, res, next) => {
  if (!req.cookies.token) {
    res.redirect(`${systemConfig.prefixadmin}/auth/login`);
  } else {
    const account = await Account.findOne({ token: req.cookies.token }).select(
      "-password",
    );
    if (account) {
      const role = await Roles.findOne({ _id: account.role_id }).select(
        "title permissions",
      );
      res.locals.role = role;
      res.locals.account = account;
      next();
    } else {
      res.redirect(`${systemConfig.prefixadmin}/auth/login`);
    }
  }
};
