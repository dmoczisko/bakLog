<script setup lang="ts">
import GamesList from '@/components/GamesListComponent.vue';
import { useStoreAuth } from '@/stores/storeAuth';

const storeAuth = useStoreAuth();
</script>
<template>
  <GamesList v-if="storeAuth.user.id" />
  <div v-else>Not logged in</div>
  <!-- second component with v else that directs user to log in -->
</template>
