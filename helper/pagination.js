module.exports = (objectPagination, query, countPage) => {
  if (query.page) {
    objectPagination.currentPage = parseInt(query.page);
  }
  objectPagination.skipPage =
    (objectPagination.currentPage - 1) * objectPagination.limitPage;

  objectPagination.totalPage = Math.ceil(
    countPage / objectPagination.limitPage,
  );
  return objectPagination;
};
