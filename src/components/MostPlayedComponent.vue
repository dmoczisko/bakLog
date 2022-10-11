<template>
  <h2 class="my-5 text-center text-3xl text-red-600">Most Played</h2>
  <div
    class="grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 my-5 px-16 flex flex-col"
  >
    <div
      class="bg-white overflow-hidden hover:bg-green-100 border border-gray-200 p-3 flex flex-col m-2 lg:m-0"
      v-for="games in gamesList"
      :key="games.title"
    >
      <!-- Future feature to figure out how to pull image from fb or api calls -->
      <!-- <img
        class="mx-auto"
        :src="`/src/assets/img/${games.imgFileName}.png`"
        :alt="`${games.title}`"
      /> -->
      <div class="m-2 text-sm">
        <div class="flex items-center">
          <h2 class="font-bold text-lg mb-2">{{ games.title }}</h2>
          <p class="text-sm ml-auto">{{ games.releaseDate }}</p>
        </div>
        <p class="text-sm">
          {{ games.description }}
        </p>
      </div>
      <div class="w-full text-right mt-auto">
        <a class="text-green-400 uppercase font-bold text-sm" href="#"
          >Read More</a
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { db } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';
//const currentYear = new Date().getFullYear();

// Get years since release - refactor later
// console.log(currentYear - game_details.releaseYear);

const gamesList = ref([]);

onMounted(async () => {
  // query firebase games collection
  const querySnapshot = await getDocs(collection(db, 'games'));
  // local array to store games objects
  let firebaseGames = [];
  // Loop through docs from games query above
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, ' => ', doc.data());
    // console.log(doc.data().title + ' ' + doc.data().description);
    // set up object for each game
    const game = {
      title: doc.data().title,
      releaseYear: doc.data().releaseYear,
      releaseDate: doc.data().releaseDate,
      genre: doc.data().genre,
      platforms: doc.data().platforms,
      description: doc.data().description,
      rating: doc.data().rating
    };
    // push game object to local firebaseGames array
    firebaseGames.push(game);
  });
  // access games ref
  gamesList.value = firebaseGames;
});
</script>
