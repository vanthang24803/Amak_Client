const rankingRanges = [
  { start: 0, end: 100000, rank: "Bronze" },
  { start: 100000, end: 500000, rank: "Silver" },
  { start: 500000, end: 1500000, rank: "Gold" },
  { start: 1500000, end: 3500000, rank: "Platinum" },
  { start: 3500000, end: Infinity, rank: "Diamond" },
];

export const calculatePercentage = (totalPrice: number | undefined) => {
  let result = { percentage: 0, rank: "" };

  totalPrice = typeof totalPrice === "number" ? totalPrice : 0;

  for (const range of rankingRanges) {
    if (totalPrice >= range.start && totalPrice < range.end) {
      let rangeSpan = range.end - range.start;
      let overshoot = totalPrice - range.start;

      result = {
        percentage: (overshoot / rangeSpan) * 100,
        rank: range.rank,
      };

      break;
    }
  }

  return result;
};
