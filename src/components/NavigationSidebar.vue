<script setup lang="ts">
import type { DefineComponent } from 'vue'
import type { IconProps } from '@/types/common'
import { ref } from 'vue'

import { RouterLink } from 'vue-router'
import AssignmentIcon from '@/components/icons/AssignmentIcon.vue'
import ChevronLeftIcon from '@/components/icons/ChevronLeftIcon.vue'

interface Menu {
  label: string
  link: string
  icon: DefineComponent<IconProps>
}

const MENUS: Menu[] = [{ label: 'To Do', link: '/to-do', icon: AssignmentIcon }]

const isOpen = ref(false)
const handleToggleSidebar = () => {
  isOpen.value = !isOpen.value
  console.log('test', isOpen.value)
}
console.log(isOpen)
</script>

<template>
  <aside
    :class="{
      'fixed lg:sticky top-0 left-0 bottom-0 bg-primary w-72 py-8 px-4 z-50 transition-all': true,
      '!w-20': !isOpen,
    }"
  >
    <div class="flex flex-col items-center overflow-x-clip': true">
      <strong class="text-white font-semibold text-2xl"
        >D<span v-if="isOpen">ashtomer</span></strong
      >
      <div :class="{ 'text-white font-medium whitespace-nowrap': true, invisible: !isOpen }">
        CRUD App
      </div>
    </div>
    <nav class="py-8 overflow-x-clip">
      <ul>
        <li v-for="menu in MENUS" :key="menu.label">
          <RouterLink
            to="/to-do"
            :class="{
              'transition-all flex gap-x-4 text-white font-medium p-4 rounded-md hover:bg-blue-900': true,
              '!px-0 justify-center items-center': !isOpen,
            }"
            active-class="bg-blue-900"
          >
            <component :is="menu.icon" size="24" color="white" />
            <span :class="{ hidden: !isOpen, 'whitespace-nowrap': true }">{{ menu.label }}</span>
          </RouterLink>
        </li>
      </ul>
    </nav>
    <button
      class="absolute top-10 left-full w-6 h-12 bg-primary rounded-r-md cursor-pointer"
      @click="handleToggleSidebar"
    >
      <ChevronLeftIcon :size="16" :class="{ 'transition-all': true, 'rotate-180': isOpen }" />
    </button>
  </aside>
</template>
