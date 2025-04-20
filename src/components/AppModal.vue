<script setup lang="ts">
interface Props {
  isOpen: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>
<template>
  <Teleport to="body" v-if="props.isOpen">
    <div
      class="fixed inset-0 flex items-center justify-center z-50 bg-slate-800/50"
      @click.stop="() => emit('close')"
    ></div>
  </Teleport>
  <Teleport to="body" v-if="props.isOpen">
    <div
      class="fixed top-1/2 -translate-1/2 left-1/2 rounded-lg bg-white py-4 lg:py-6 z-[60] flex flex-col gap-4 lg:gap-6 w-4/5 max-w-[400px]"
    >
      <div class="flex gap-x-4 justify-between px-4 lg:px-6">
        <div class="text-2xl font-semibold">
          <slot name="title" />
        </div>
        <span
          class="text-2xl cursor-pointer"
          role="button"
          aria-label="close"
          @click="() => emit('close')"
          >&#215;</span
        >
      </div>
      <div class="px-4 lg:px-6">
        <slot name="content" />
      </div>
    </div>
  </Teleport>
</template>
