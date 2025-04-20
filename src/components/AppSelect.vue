<script setup lang="ts">
import Multiselect from 'vue-multiselect'
import { defineProps, defineEmits, computed } from 'vue'

type Option = Record<string, unknown>

const props = defineProps<{
  modelValue: string | number | null
  options: Option[]
  label?: string
  placeholder?: string
  error?: string
  multiple?: boolean
  trackBy?: string
  labelKey?: string
  size?: 'small' | 'medium'
}>()

const emit = defineEmits(['update:modelValue'])

const selected = computed({
  get() {
    return props.options.find((opt) => opt.value === props.modelValue) || null
  },
  set(val: Option | null) {
    emit('update:modelValue', val?.value ?? null)
  },
})
</script>
<template>
  <div class="flex flex-col gap-1 app-select">
    <label v-if="props.label" class="text-sm font-medium text-slate-700">
      {{ props.label }}
    </label>

    <multiselect
      v-model="selected"
      :options="props.options"
      :multiple="props.multiple"
      :track-by="props.trackBy"
      :label="props.labelKey"
      :placeholder="props.placeholder"
      :class="[props.error ? 'error' : '', size]"
    />

    <p v-if="props.error" class="text-sm text-red-600">{{ props.error }}</p>
  </div>
</template>
<style>
@reference "../assets/base.css";

.app-select {
  .multiselect__select::before {
    @apply my-0;
    position: absolute;
    top: 50%;
    left: 50%;
    right: unset;
    transform: translate(-50%, -50%);
  }

  .multiselect__select {
    @apply flex items-center justify-center h-full;
  }

  .small {
    &.multiselect {
      min-height: unset;
    }

    &.multiselect,
    &.multiselect__select {
      height: 34px;
    }

    .multiselect__option--highlight::after {
      display: none;
    }

    .multiselect__tags {
      padding-block: 0;
      min-height: 34px;
      @apply flex items-center;
    }

    .multiselect__input,
    .multiselect__single,
    .multiselect__placeholder {
      @apply mb-0;
    }
  }

  .multiselect__tags {
    padding-top: 10px;
    @apply border-slate-300 text-base;
  }

  .error > .multiselect__tags {
    @apply border-red-600;
  }

  .multiselect__option--highlight {
    @apply bg-primary;
  }

  .multiselect__option--highlight.multiselect__option--selected {
    @apply bg-red-400;
  }
}
</style>
