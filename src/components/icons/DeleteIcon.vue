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
      d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
    />
  </svg>
</template>
