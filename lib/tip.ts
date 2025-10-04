export interface TipData {
  bill: number;
  tipPercent: number;
  people: number;
}

export function calculateTip({ bill, tipPercent, people }: TipData) {
  const safeBill = Number.isFinite(bill) && bill > 0 ? bill : 0;
  const safePeople = Number.isFinite(people) && people > 0 ? Math.max(1, Math.floor(people)) : 1;
  const safePercent = Number.isFinite(tipPercent) && tipPercent > 0 ? tipPercent : 0;

  if (safeBill === 0) return { tipAmount: 0, total: 0 };

  const tipAmount = (safeBill * (safePercent / 100)) / safePeople;
  const total = safeBill / safePeople + tipAmount;

  return { tipAmount, total };
}
