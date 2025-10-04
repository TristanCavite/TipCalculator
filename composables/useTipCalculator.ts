import { calculateTip } from "@/lib/tip";
import { computed, ref } from "vue";

type Initial = { bill?: number; tipPercent?: number; people?: number };

export function useTipCalculator(initial: Initial = {}) {
  const bill = ref<number>(initial.bill ?? 0);
  const tipPercent = ref<number>(initial.tipPercent ?? 0);
  const people = ref<number>(initial.people ?? 1);

  const result = computed(() =>
    calculateTip({
      bill: Number.isFinite(bill.value) ? bill.value : 0,
      tipPercent: Number.isFinite(tipPercent.value) ? tipPercent.value : 0,
      people: Number.isFinite(people.value) ? people.value : 1,
    })
  );

  const tipAmount = computed(() => result.value.tipAmount);
  const total = computed(() => result.value.total);
  const isZero = computed(() => tipAmount.value === 0 && total.value === 0);

  function reset() {
    bill.value = 0;
    tipPercent.value = 0;
    people.value = 1;
  }

  function setBill(n: number) {
    bill.value = Number.isFinite(n) && n >= 0 ? n : 0;
  }

  function setTipPercent(n: number) {
    tipPercent.value = Number.isFinite(n) && n >= 0 ? n : 0;
  }

  function setPeople(n: number) {
    const p = Math.floor(Number(n));
    people.value = Number.isFinite(p) && p > 0 ? p : 0;
  }

  function sanitizeBillInput(s: string) {
    let v = s.replace(/[^0-9.]/g, "");
    const i = v.indexOf(".");
    if (i >= 0) {
      const left = v.slice(0, i);
      const right = v.slice(i + 1).replace(/\./g, "");
      v = left + "." + right;
    }
    if (v === ".") v = "";
    return v;
  }

  function setBillFromString(s: string) {
    const clean = sanitizeBillInput(s);
    setBill(clean === "" ? 0 : parseFloat(clean));
  }

  function sanitizeIntInput(s: string) {
    return s.replace(/\D/g, "").replace(/^0+(?=\d)/, "");
  }

  function setPeopleFromString(s: string) {
    const clean = sanitizeIntInput(s);
    setPeople(clean === "" ? 0 : parseInt(clean, 10));
  }

  function sanitizePercentInput(s: string) {
    return sanitizeBillInput(s);
  }

  function setTipFromString(s: string) {
    const clean = sanitizePercentInput(s);
    setTipPercent(clean === "" ? 0 : parseFloat(clean));
  }

  function formatCurrency(n = 0) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }).format(n);
  }

  return {
    bill,
    tipPercent,
    people,
    result,
    tipAmount,
    total,
    isZero,
    reset,
    setBill,
    setTipPercent,
    setPeople,
    setBillFromString,
    setPeopleFromString,
    setTipFromString,
    formatCurrency,
  };
}
