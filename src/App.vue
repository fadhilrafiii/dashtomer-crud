<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavigationSidebar from './components/NavigationSidebar.vue'
import NavigationTop from './components/NavigationTop.vue'
</script>

<template>
  <div class="flex h-screen w-full overflow-y-auto">
    <NavigationSidebar />
    <main class="relative w-full pl-0 md:pl-20 lg:pl-0">
      <NavigationTop />
      <div class="py-8 px-4 md:px-8">
        <RouterView />
      </div>
    </main>
  </div>
</template>
