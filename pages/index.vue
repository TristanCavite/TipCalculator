<template>
  <div class="flex min-h-screen flex-col items-center justify-center bg-cyan-50 p-6">
    <h1 class="mb-8 text-3xl font-bold text-teal-900">Tristan's Tip Calculator</h1>
    <div
      class="grid w-full max-w-4xl grid-cols-1 gap-6 rounded-2xl bg-white p-6 shadow-lg md:grid-cols-2"
    >
      <div class="space-y-6">
        <TipInput v-model="bill" />
        <TipSelector v-model="tipPercent" />
        <PeopleInput v-model="people" />
      </div>

      <div class="flex items-start justify-center">
        <ResultCard />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useTipCalculator } from "@/composables/useTipCalculator";
  import { provide } from "vue";

  const {
    bill,
    tipPercent,
    people,
    tipAmount,
    total,
    isZero,
    reset,
    setBillFromString,
    setPeopleFromString,
    setTipFromString,
    setTipPercent,
    formatCurrency,
  } = useTipCalculator({ tipPercent: 5 });

  provide("tipSetters", {
    setBillFromString,
    setPeopleFromString,
    setTipFromString,
    setTipPercent,
    tipAmount,
    total,
    isZero,
    reset,
    formatCurrency,
  });
</script>
