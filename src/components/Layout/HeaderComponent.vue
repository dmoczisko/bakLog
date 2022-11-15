<template>
  <header
    class="w-full bg-slate-900 text-white text-2xl font-medium px-16 py-6 z-50"
  >
    <nav class="flex align-center">
      <RouterLink to="/login">Baklog</RouterLink>
      <div v-if="storeAuth.user.id">
        <RouterLink to="/master-collection" class="ml-5">
          Find a Game
        </RouterLink>
        <RouterLink to="/my-games" class="ml-5">My Collection</RouterLink>
      </div>

      <div v-if="storeAuth.user.id" class="flex ml-auto">
        <p>Hello {{ storeAuth.user.email }}</p>
        <RouterLink to="#" class="ml-auto">
          <UserIcon class="h-10 w-10 mx-2" />
        </RouterLink>
        <button @click="storeAuth.logoutUser()">
          <ArrowLeftOnRectangleIcon class="h-10 w-10 mx-2" />
        </button>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { UserIcon } from '@heroicons/vue/24/solid';
import { ArrowLeftOnRectangleIcon } from '@heroicons/vue/24/solid';
import { useStoreAuth } from '@/stores/storeAuth';

/*store*/
const storeAuth = useStoreAuth();
</script>
