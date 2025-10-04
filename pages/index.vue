<template>
  <div class="flex min-h-screen items-center justify-center bg-cyan-50 p-6">
    <div
      class="grid w-full max-w-4xl grid-cols-1 gap-6 rounded-2xl bg-white p-6 shadow-lg md:grid-cols-2"
    >
      <div class="space-y-6">
        <TipInput v-model="bill" />
        <TipSelector v-model="tipPercent" />
        <PeopleInput v-model="people" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useTipCalculator } from "@/composables/useTipCalculator";
  import { provide } from "vue";

  const { bill, tipPercent, people } = useTipCalculator({ tipPercent: 5 });
</script>
