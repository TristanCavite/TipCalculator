<!-- components/TipInput.vue -->
<template>
  <div class="w-full">
    <label class="mb-2 block text-xs font-medium text-gray-800">Bill</label>
    <div class="relative rounded-lg bg-[#E8F7F6]">
      <DollarSign
        class="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-teal-600"
      />
      <input
        :value="local"
        @input="onInput"
        @paste="onPaste"
        inputmode="decimal"
        placeholder="0"
        class="w-full bg-transparent py-4 pr-4 pl-12 text-right text-lg text-gray-800 outline-none placeholder:text-teal-200 placeholder:opacity-90"
        aria-label="Bill"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { DollarSign } from "lucide-vue-next";
  import { ref, watch } from "vue";

  const props = defineProps<{ modelValue?: number }>();
  const emit = defineEmits<{ (e: "update:modelValue", value: number): void }>();
  const local = ref(
    props.modelValue != null && props.modelValue !== 0 ? String(props.modelValue) : ""
  );

  watch(
    () => props.modelValue,
    (v) => {
      local.value = v != null && v !== 0 ? String(v) : "";
    }
  );

  function sanitizeBill(input: string) {
    let s = input.replace(/[^0-9.]/g, "");
    const firstDotIndex = s.indexOf(".");
    if (firstDotIndex >= 0) {
      const left = s.slice(0, firstDotIndex);
      const right = s.slice(firstDotIndex + 1).replace(/\./g, "");
      s = left + "." + right;
    }
    if (s === ".") s = "";
    return s;
  }

  function onInput(e: Event) {
    const el = e.target as HTMLInputElement;
    const raw = el.value;
    const clean = sanitizeBill(raw);
    if (clean !== raw) {
      el.value = clean;
    }
    local.value = clean;
    if (clean.trim() === "") {
      emit("update:modelValue", 0);
      return;
    }
    const parsed = parseFloat(clean);
    emit("update:modelValue", Number.isFinite(parsed) ? parsed : 0);
  }

  function onPaste(e: ClipboardEvent) {
    e.preventDefault();
    const text = e.clipboardData?.getData("text") ?? "";
    const clean = sanitizeBill(text);
    const target = e.target as HTMLInputElement;
    target.value = clean;
    local.value = clean;
    if (clean.trim() === "") {
      emit("update:modelValue", 0);
      return;
    }
    const parsed = parseFloat(clean);
    emit("update:modelValue", Number.isFinite(parsed) ? parsed : 0);
  }
</script>

<style scoped>
  input::placeholder {
    color: rgba(6, 182, 174, 0.45);
  }
</style>
