<template>
  <!-- importing my games into games list component -->
  <MyGames />
  <!-- importing my games into games list component -->

  <!-- this section will eventually be derived from the API json response -->
  <MasterGames />
  <!-- this section will eventually be derived from the API json response -->
</template>

<script setup lang="ts">
// import { ref, computed } from 'vue';
import MyGames from '@/components/MyGamesComponent.vue';
import MasterGames from '@/components/MasterGamesComponent.vue';
</script>

<style>
.cursorPointer:hover {
  cursor: pointer;
}
</style>
