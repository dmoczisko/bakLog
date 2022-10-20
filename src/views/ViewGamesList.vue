<script setup lang="ts">
import MyGames from '@/components/MyGamesComponent.vue';

// Hiding most played & search for now while prototyping collection addition from main
// import SearchComponent from '@/components/SearchComponent.vue';
// import MostPlayed from '@/components/MostPlayedComponent.vue';
import GamesList from '@/components/GamesListComponent.vue';
</script>
<template>
  <SearchComponent />
  <MyGames />
  <MostPlayed />
  <GamesList />
</template>
