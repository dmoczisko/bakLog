<script setup lang="ts">
import { RouterView } from 'vue-router';
import Header from './components/HeaderComponent.vue';
import GamesList from './components/GamesListComponent.vue';
import MostPlayed from './components/MostPlayedComponent.vue';
import Footer from './components/FooterComponent.vue';

//need to move to hidden, gitignored file
fetch('https://url.com', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
  // body: JSON.stringify({
  //   name: 'User 1'
  // })
})
  .then((res) => {
    return res.json();
  })
  .then((data) => console.log(data))
  .catch((error) => console.log('Error'));
</script>

<template>
  <div class="wrapper min-h-screen">
    <Header />
    <RouterView />
    <MostPlayed />
    <GamesList />
    <Footer />
  </div>
</template>

<style scoped></style>
