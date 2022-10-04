<template>
  <header class="bg-orange-400 text-stone-900 text-2xl font-medium px-16 py-6">
    <nav class="flex align-center">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink class="ml-auto" to="#">
        <UserIcon class="h-10 w-10" />
      </RouterLink>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { UserIcon } from '@heroicons/vue/24/solid';
</script>
