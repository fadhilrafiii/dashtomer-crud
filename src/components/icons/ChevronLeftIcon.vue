<script setup lang="ts">
import { type IconProps } from '@/types/common'

const props = defineProps<IconProps>()
</script>
<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :height="`${props.size}px`"
    :width="`${props.size}px`"
    viewBox="0 -960 960 960"
    :fill="props.color ?? '#fff'"
  >
    <path
      xmlns="http://www.w3.org/2000/svg"
      d="M640-80 240-480l400-400 71 71-329 329 329 329-71 71Z"
    />
  </svg>
</template>
