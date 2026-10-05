function Createtree(arr, parentid = "") {
  const tree = [];
  arr.forEach((item) => {
    if (item.parent_id == parentid) {
      const newItem = item;
      const childrent = Createtree(arr, item.id);
      console.log(childrent.length + " " + item.title);
      if (childrent.length > 0) {
        newItem.childrent = childrent;
      }
      tree.push(newItem);
    }
  });
  return tree;
}
module.exports = (arr) => {
  const tree = Createtree(arr);
  return tree;
};
