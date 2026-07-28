export const pricePerLiter = (totalCost: number, liters: number): number | null => {
  if (!Number.isFinite(totalCost) || !Number.isFinite(liters) || liters <= 0) {
    return null;
  }

  return totalCost / liters;
};
