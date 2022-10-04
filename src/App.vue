<script setup lang="ts">
import { RouterView } from 'vue-router';
import Header from './components/HeaderComponent.vue';
import GamesList from './components/GamesListComponent.vue';
import Footer from './components/FooterComponent.vue';
</script>

<template>
  <div class="wrapper">
    <Header />
    <RouterView />
    <GamesList />
    <Footer />
  </div>
</template>

<style scoped></style>
