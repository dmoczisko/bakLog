<template>
  <h2 class="my-5 text-center text-3xl text-red-600">Back Log</h2>
  <div
    class="grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 my-5 px-16 flex flex-col"
  >
    <div
      class="bg-white overflow-hidden hover:bg-green-100 border border-gray-200 p-3 flex flex-col m-2 lg:m-0"
      v-for="games in gamesList"
      :key="games['title']"
    >
      <!-- Future feature to figure out how to pull image from fb or api calls -->
      <!-- <img
        class="mx-auto"
        :src="`/src/assets/img/${games.imgFileName}.png`"
        :alt="`${games.title}`"
      /> -->
      <div class="m-2 text-sm">
        <div class="flex items-center">
          <h2 class="font-bold text-lg mb-2">{{ games['title'] }}</h2>
          <p class="text-sm ml-auto">{{ games['releaseDate'] }}</p>
        </div>
        <p class="text-sm">
          {{ games['description'] }}
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
import { collection, onSnapshot } from 'firebase/firestore';
import { useStoreAuth } from '@/stores/storeAuth';

const gamesList = ref([]);
const storeAuth = useStoreAuth();
onMounted(async () => {
  onSnapshot(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    collection(db, 'users', storeAuth.user.id, 'games'),
    (querySnapshot) => {
      let firebaseGames: Object[] = [];
      querySnapshot.forEach((doc) => {
        const game = {
          ...doc.data()
        };
        firebaseGames.push(game);
      });
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      gamesList.value = firebaseGames;
    }
  );
});
</script>
