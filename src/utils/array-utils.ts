export const updateArrayValue = (
  arr: number[],
  index: number,
  newValue: number
): number[] => {
  return arr.map((it, ind) => (ind === index ? newValue : it));
};
