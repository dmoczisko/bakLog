<script setup lang="ts">
// Hiding most played & search for now while prototyping collection addition from main
// import SearchComponent from '@/components/SearchComponent.vue';
// import MostPlayed from '@/components/MostPlayedComponent.vue';
import GamesList from '@/components/GamesListComponent.vue';
import { useStoreAuth } from '@/stores/storeAuth';

const storeAuth = useStoreAuth();
</script>
<template>
  <!-- <SearchComponent /> -->
  <!-- <MostPlayed /> -->
  <GamesList v-if="storeAuth.user.id" />
  <div v-else>Not logged in</div>
  <!-- second component with v else that directs user to log in -->
</template>
