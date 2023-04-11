export const getPagination = (page: number, size: number) => {
  page = Math.floor(page);
  size = Math.ceil(size);
  const limit = size ? +size : 3;
  const from = page ? page * limit : 0;
  const to = page ? from + size : size;

  return { from, to };
};

export const getDateFromRange = (timeframe: "day" | "week" | "month") => {
  const today = new Date();
  const desiredDate = new Date(today)
  switch(timeframe) {
    case "day": case "week":
      desiredDate.setDate(
        desiredDate.getDate() - (timeframe === "day" ? 1 : 7)
      );
      break;
    case "month":
      desiredDate.setMonth(desiredDate.getMonth() - 1)
      break;
  }
  
  // sterilize
  desiredDate.setHours(0)
  desiredDate.setMinutes(0)
  desiredDate.setSeconds(0)
  desiredDate.setMilliseconds(0)
  return { desiredDate }
}
