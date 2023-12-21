export const formatNumberWithCommas = (number) => {
  // Use Intl.NumberFormat to format number with commas
  return new Intl.NumberFormat("en-US").format(number);
};
