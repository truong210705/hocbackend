const md5 = require("md5");
const Account = require("../../model/accounts.model");
const Roles = require("../../model/roles.model");
const systemConfig = require("../../config/system");

module.exports.index = async (req, res) => {
  const find = {
    deleted: false,
  };

  const account = await Account.find(find).select("-password -token");
  for (const record of account) {
    const role = await Roles.findOne({
      _id: record.role_id,
      deleted: false,
    });
    record.role = role;
  }
  res.render("admin/page/accounts/index", {
    title: "nhóm quyền",
    accounts: account,
  });
};
module.exports.create = async (req, res) => {
  const roles = await Roles.find({ deleted: false });
  res.render("admin/page/accounts/create", {
    title: "nhóm quyền",
    roles,
  });
};
// [POST] /admin/accounts/create
module.exports.createPost = async (req, res) => {
  const emailExist = await Account.findOne({
    email: req.body.email,
    deleted: false,
  });
  console.log(emailExist);
  if (emailExist) {
    req.flash("error", `Email ${req.body.email} đã tồn tại!`);
    res.redirect(req.get("Referer"));
  } else {
    req.body.password = md5(req.body.password);

    const record = new Account(req.body);
    await record.save();

    res.redirect(req.get("Referer"));
  }
};
module.exports.edit = async (req, res) => {
  const roles = await Roles.find({ deleted: false });
  const id = req.params.id;
  const accounts = await Account.findById({ _id: id });
  console.log(accounts);
  res.render("admin/page/accounts/edit", {
    title: "nhóm quyền",
    roles,
    accounts,
  });
};
// [PATCH] /admin/accounts/edit/:id
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;

  const emailExist = await Account.findOne({
    _id: { $ne: id },
    email: req.body.email,
    deleted: false,
  });

  if (emailExist) {
    req.flash("error", `Email ${req.body.email} đã tồn tại`);
    res.redirect("back");
  } else {
    if (req.body.password) {
      req.body.password = md5(req.body.password);
    } else {
      delete req.body.password;
    }

    await Account.updateOne({ _id: id }, req.body);

    req.flash("success", "Cập nhật tài khoản thành công!");
    res.redirect(req.get("Referer"));
  }
};
