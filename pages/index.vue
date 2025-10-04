<template>
  <div class="flex min-h-screen items-center justify-center bg-cyan-50 p-6">
    <div
      class="grid w-full max-w-4xl grid-cols-1 gap-6 rounded-2xl bg-white p-6 shadow-lg md:grid-cols-2"
    >
      <div class="space-y-6">
        <TipInput v-model="bill" />
        <PeopleInput v-model="people" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { calculateTip } from "@/lib/tip";
  import { computed, ref } from "vue";

  const bill = ref(0);
  const tipPercent = ref(0);
  const people = ref(1);

  const calc = computed(() =>
    calculateTip({ bill: bill.value, tipPercent: tipPercent.value, people: people.value })
  );
  const isZero = computed(() => calc.value.tipAmount === 0 && calc.value.total === 0);

  function reset() {
    bill.value = 0;
    tipPercent.value = 0;
    people.value = 1;
  }
</script>
