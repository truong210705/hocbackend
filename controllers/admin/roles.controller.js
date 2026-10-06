const Roles = require("../../model/roles.model");
const systemConfig = require("../../config/system");
module.exports.index = async (req, res) => {
  const role = await Roles.find({ deleted: false });
  res.render("admin/page/roles/index", {
    title: "nhóm quyền",
    roles: role,
  });
};
module.exports.create = async (req, res) => {
  const role = await Roles.find({});
  res.render("admin/page/roles/create", {
    title: "nhóm quyền",
    roles: role,
  });
};
module.exports.createPost = async (req, res) => {
  const roles = new Roles(req.body);
  await roles.save();
  req.flash("success", `thêm danh mục thành công`);
  res.redirect(`${systemConfig.prefixadmin}/roles`);
};
module.exports.edit = async (req, res) => {
  const role = await Roles.findOne({ _id: req.params.id });
  res.render("admin/page/roles/edit", {
    title: "nhóm quyền",
    roles: role,
  });
};
module.exports.editPost = async (req, res) => {
  await Roles.updateOne({ _id: req.params.id }, req.body);
  res.redirect(`${systemConfig.prefixadmin}/roles`);
};
module.exports.delete = async (req, res) => {
  await Roles.updateOne({ _id: req.params.id }, { deleted: true });
  res.redirect(`${systemConfig.prefixadmin}/roles`);
};
