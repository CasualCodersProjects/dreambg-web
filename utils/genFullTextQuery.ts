const genFullTextQuery = (search: string) => {
  const terms = search.split(" ");
  const separator = "' | '";
  const query = terms.join(separator);
  return `'${query}'`;
};

export default genFullTextQuery;
