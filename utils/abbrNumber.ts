const abbrNum = (n: any) => {
  if (n < 1000) {
    return n.toString();
  }
  if (n >= 1000 && n < 1000000) {
    return (n / 1000).toFixed(1).toString() + "k";
  }
  if (n >= 1000000 && n < 1000000000) {
    return (n / 1000000).toFixed(1).toString() + "m";
  }
  if (n >= 1000000000) {
    return (n / 1000000000).toFixed(1).toString() + "b";
  }
};

export default abbrNum;
