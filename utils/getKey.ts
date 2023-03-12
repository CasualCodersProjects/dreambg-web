const getKey = (pageIndex: number, previousPageData: any) => {
  if (previousPageData && !previousPageData.length) return null;
  return `${pageIndex}`; // if this function returns a falsy value nothing will load.
};

export default getKey;
