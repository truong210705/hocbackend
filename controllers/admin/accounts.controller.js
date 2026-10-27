const md5 = require("md5");
const Account = require("../../model/accounts.model");
const systemConfig = require("../../config/system");
module.exports.index = async (req, res) => {
  const find = {
    deleted: false,
  };
  const account = await Account.find(find);
  res.render("admin/page/accounts/index", {
    title: "nhóm quyền",
    accounts: account,
  });
};
module.exports.create = async (req, res) => {
  res.render("admin/page/accounts/create", {
    title: "nhóm quyền",
  });
};
module.exports.createPost = async (req, res) => {
  req.body.password = md5(req.body.password);

  const record = new Account(req.body);
  await record.save();

  res.redirect(`${systemConfig.prefixadmin}/accounts`);
};
