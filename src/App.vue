<script setup lang="ts">
import { RouterView } from 'vue-router';
import Header from './components/HeaderComponent.vue';
import GamesList from './components/GamesListComponent.vue';
import MostPlayed from './components/MostPlayedComponent.vue';
import Footer from './components/FooterComponent.vue';

const clientSecret = import.meta.env.VITE_TWITCH_SECRET;
const clientId = import.meta.env.VITE_TWITCH_CLIENT_ID;

fetch(
  `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`,

  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
    // body: JSON.stringify({
    //   name: 'User 1'
    // })
  }
)
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