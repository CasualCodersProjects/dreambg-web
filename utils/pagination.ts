export const getPagination = (page: number, size: number) => {
  page = Math.floor(page);
  size = Math.ceil(size);
  const limit = size ? +size : 3;
  const from = page ? page * limit : 0;
  const to = page ? from + size : size;

  return { from, to };
};
