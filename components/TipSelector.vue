<template>
  <div>
    <label class="mb-3 block text-xs font-medium text-gray-600">Select Tip %</label>
    <div class="grid grid-cols-3 gap-3">
      <button
        v-for="opt in options"
        :key="opt"
        type="button"
        @click="select(opt)"
        :class="buttonClass(opt)"
      >
        {{ opt }}%
      </button>

      <div class="col-span-3 sm:col-span-1">
        <input
          v-model="customLocal"
          @input="onCustomInput"
          @focus="onFocus"
          @blur="onBlur"
          inputmode="decimal"
          placeholder="Custom"
          :class="[
            'w-full rounded-md px-3 py-2 text-center text-sm transition-colors outline-none',
            isCustomActive
              ? 'border-teal-700 bg-teal-900 text-white placeholder-white/60'
              : 'border border-teal-800 bg-white text-teal-900 placeholder:text-gray-300',
          ]"
          aria-label="Custom tip percent"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { inject, ref, watch } from "vue";

  const options = [5, 10, 15, 25, 50];
  const props = defineProps<{ modelValue: number }>();
  const emit = defineEmits<{ (e: "update:modelValue", value: number): void }>();
  const setters = inject<{
    setTipPercent?: (n: number) => void;
    setTipFromString?: (s: string) => void;
  } | null>("tipSetters", null);

  const customLocal = ref(
    props.modelValue && !options.includes(props.modelValue) ? String(props.modelValue) : ""
  );
  const isCustomActive = ref(false);

  watch(
    () => props.modelValue,
    (v) => {
      if (options.includes(v)) {
        customLocal.value = "";
        isCustomActive.value = false;
      } else {
        customLocal.value = v ? String(v) : "";
        isCustomActive.value = !!(v && !options.includes(v));
      }
    }
  );

  function select(n: number) {
    isCustomActive.value = false;
    if (setters?.setTipPercent) {
      setters.setTipPercent(n);
      return;
    }
    if (setters?.setTipFromString) {
      setters.setTipFromString(String(n));
      return;
    }
    emit("update:modelValue", n);
  }

  function sanitizePercent(s: string) {
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

  function onCustomInput() {
    const raw = customLocal.value;
    const clean = sanitizePercent(raw);
    if (clean !== raw) customLocal.value = clean;
    const n = clean === "" ? 0 : parseFloat(clean);
    isCustomActive.value = clean !== "";
    if (setters?.setTipFromString) {
      setters.setTipFromString(clean);
      return;
    }
    if (setters?.setTipPercent) {
      setters.setTipPercent(Number.isFinite(n) ? n : 0);
      return;
    }
    emit("update:modelValue", Number.isFinite(n) ? n : 0);
  }

  function onFocus() {
    isCustomActive.value = true;
  }
  function onBlur() {
    if (!customLocal.value) isCustomActive.value = false;
  }

  function buttonClass(opt: number) {
    const base = "py-2 rounded-md font-semibold text-sm";
    const active = "bg-teal-900 text-white";
    const inactive = "bg-teal-800/10 text-teal-900";
    return [base, props.modelValue === opt ? active : inactive].join(" ");
  }
</script>
