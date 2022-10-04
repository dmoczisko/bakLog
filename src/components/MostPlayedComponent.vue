<template>
  <h2 class="my-5 text-center text-3xl text-red-600">Most Played</h2>
  <div class="grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 my-5 px-16">
    <div
      class="bg-white overflow-hidden hover:bg-green-100 border border-gray-200 p-3"
      v-for="games in game_details"
      :key="games.title"
    >
      <img
        class="mx-auto"
        :src="`/src/assets/img/${games.imgFileName}.png`"
        :alt="`${games.title}`"
      />
      <div class="m-2 text-sm">
        <div class="flex items-center">
          <h2 class="font-bold text-lg mb-2">{{ games.title }}</h2>
          <p class="text-sm ml-auto">{{ games.releaseDate }}</p>
        </div>
        <p class="text-sm">
          {{ games.description }}
        </p>
      </div>
      <div class="w-full text-right mt-4">
        <a class="text-green-400 uppercase font-bold text-sm" href="#"
          >Read More</a
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { ref } from 'vue';
//const currentYear = new Date().getFullYear();

// Get years since release - refactor later
// console.log(currentYear - game_details.releaseYear);

const game_details = [
  {
    title: 'Super Mario 64',
    releaseYear: 1996,
    releaseDate: 'June 23, 1996',
    genre: 'Adventure, Platform',
    platforms: 'Wii U, Wii, Nintendo 64',
    description:
      "The first three dimensional entry in the Mario franchise, Super Mario 64 follows Mario as he puts his broadened 3D movement arsenal to use in order to rescue Princess Peach from the clutches of his arch rival Bowser. Mario has to jump into worlds-within-paintings ornamenting the walls of Peach's castle, uncover secrets and hidden challenges and collect golden stars as reward for platforming trials.",
    rating: '90',
    imgFileName: 'sm64'
  },
  {
    title: 'The Legend of Zelda: Ocarina of Time',
    releaseYear: 1998,
    releaseDate: 'Nov 21, 1998',
    genre: 'Adventure, Platform',
    platforms: 'Wii U, Wii, Nintendo 64',
    description:
      'A 3D reimagining of the core premise of The Legend of Zelda: A Link to the Past (1991), Ocarina of Time follows Link, the protagonist, as he picks up a sword and leaves behind his humble origins in order to trek across the land of Hyrule, venture into its treacherous dungeons and travel through time itself to fulfill his destiny as the Hero of Time by defeating his enemy Ganondorf and ridding Hyrule of evil.',
    rating: '92',
    imgFileName: 'oot'
  },
  {
    title: 'GoldeneEye 007',
    releaseYear: 1997,
    releaseDate: 'Aug 23, 1997',
    genre: 'Adventure, Shooter',
    platforms: 'Nintendo 64',
    description:
      'GoldenEye 007 is a first-person shooter video game developed by Rare and based on the 1995 James Bond film GoldenEye. It was exclusively released for the Nintendo 64 video game console in August 1997.',
    rating: '92',
    imgFileName: '007'
  }
];
</script>
