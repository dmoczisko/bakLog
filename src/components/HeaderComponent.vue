<template>
  <header class="bg-orange-400 text-stone-900 text-2xl font-medium px-16 py-6">
    <nav class="flex align-center">
      <RouterLink to="#">Baklog</RouterLink>
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
if (storeAuth.user.id) {
  console.log(`Users storeAuth ID in HeaderComponent.vue `, storeAuth.user.id);
} else {
  console.log('User is logged out, no ID to console log');
}
</script>
