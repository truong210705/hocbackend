module.exports = (query) => {
  const objectSearch = {
    keyword: "",
  };

  if (query.keyword) {
    objectSearch.keyword = query.keyword.trim();
    const re = new RegExp(objectSearch.keyword, "i");
    objectSearch.regex = re;
  }
  return objectSearch;
};
