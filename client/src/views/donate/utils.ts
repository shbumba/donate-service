export const convertPrice = (value: number, divider: number = 10) => {
  return Math.round(value / divider) * divider || 0;
};
