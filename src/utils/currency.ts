export const convertUSDToINR = (usd: number): number => {
  return Math.round(usd * 83);
};

export const formatPrice = (usd: number, showSymbol: boolean = true): string => {
  const inr = convertUSDToINR(usd);
  const formatted = new Intl.NumberFormat('en-IN').format(inr);
  return showSymbol ? `₹${formatted} INR` : `${formatted} INR`;
};
