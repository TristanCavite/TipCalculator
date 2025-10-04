<template>
  <UiCard class="min-h-[20rem] w-full max-w-sm bg-teal-900 text-white">
    <UiCardContent>
      <div class="flex items-start justify-between">
        <div>
          <p class="text-sm tracking-wide opacity-80">Tip Amount</p>
          <p class="mt-1 text-xs text-teal-200/70">/ person</p>
        </div>
        <div class="text-4xl font-extrabold tracking-wide text-teal-200">
          {{ formatCurrency(tipValue) }}
        </div>
      </div>

      <div class="mt-6 flex items-start justify-between">
        <div>
          <p class="text-sm tracking-wide opacity-80">Total</p>
          <p class="mt-1 text-xs text-teal-200/70">/ person</p>
        </div>
        <div class="text-4xl font-extrabold tracking-wide text-teal-200">
          {{ formatCurrency(totalValue) }}
        </div>
      </div>
    </UiCardContent>

    <UiCardFooter class="mt-8">
      <UiButton :disabled="isZero" class="w-full" @click="onReset">RESET</UiButton>
    </UiCardFooter>
  </UiCard>
</template>

<script setup lang="ts">
  import UiButton from "@/components/Ui/Button.vue";
  import UiCard from "@/components/Ui/Card/Card.vue";
  import UiCardContent from "@/components/Ui/Card/Content.vue";
  import UiCardFooter from "@/components/Ui/Card/Footer.vue";
  import { computed, inject } from "vue";

  const props = defineProps<{
    tipAmount?: number;
    total?: number;
  }>();

  const emit = defineEmits<{ (e: "reset"): void }>();

  const setters = inject<any>("tipSetters", null);

  const tipValue = computed(() => {
    if (props.tipAmount != null) return props.tipAmount;
    return setters?.tipAmount?.value ?? 0;
  });

  const totalValue = computed(() => {
    if (props.total != null) return props.total;
    return setters?.total?.value ?? 0;
  });

  function formatCurrency(n = 0) {
    if (setters?.formatCurrency) return setters.formatCurrency(n);
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }).format(n);
  }

  const isZero = computed(() => tipValue.value === 0 && totalValue.value === 0);

  function onReset() {
    if (setters?.reset) {
      setters.reset();
      return;
    }
    emit("reset");
  }
</script>
