<template>
  <div class="my-5 text-center text-3xl text-orange-600 font-bold">
    Main Games List
  </div>

  <div class="flex items-center justify-center my-5">
    <div class="flex border-2 border-slate-200 rounded">
      <input
        v-model="searchQuery"
        type="text"
        class="px-4 py-2 w-96 placeholder:text-slate-900"
        placeholder="Search by Title"
        @keyup.enter="submitQuery(searchQuery)"
      />
      <button
        class="px-4 text-white bg-orange-600 border-l hover:bg-orange-500"
        @click="submitQuery(searchQuery)"
        @keyup.enter="submitQuery(searchQuery)"
      >
        Search
      </button>
    </div>
  </div>

  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-16"
  >
    <div
      v-for="game in searchResults"
      :key="game.id"
      class="bg-white shadow-md rounded overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <img
        :src="game.background_image"
        alt="Game Image"
        class="w-full h-48 object-cover"
      />
      <div class="p-4">
        <h3 class="text-lg font-bold mb-2">{{ game.name }}</h3>
        <p class="text-sm text-gray-600 mb-2">
          <strong>Platforms:</strong>
          {{ game.platforms.map((p) => p.platform.name).join(', ') }}
        </p>
        <p class="text-sm text-gray-600 mb-2">
          <strong>Genres:</strong>
          {{ game.genres.map((g) => g.name).join(', ') }}
        </p>
        <div class="flex justify-between items-center mt-4">
          <PlusIcon
            class="w-5 h-5 text-orange-600 hover:text-orange-500 cursor-pointer"
            @click="addGameToFirestore(game)"
          />
          <EyeIcon
            class="w-5 h-5 text-orange-600 hover:text-orange-500 cursor-pointer"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { PlusIcon } from '@heroicons/vue/24/solid';
import { EyeIcon } from '@heroicons/vue/24/solid';
import type { Game } from '@/models/models';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import { getAuth } from 'firebase/auth';

defineProps<{
  mainGamesList: Game[];
}>();

const searchQuery = ref('');
const searchResults = ref<Game[]>([]);

const emit = defineEmits(['addGame', 'submitQuery']);

async function submitQuery(query: string) {
  emit('submitQuery', query);
  const apiKey = import.meta.env.VITE_RAWG_API_KEY;
  const response = await fetch(
    `https://api.rawg.io/api/games?key=${apiKey}&search=${query}`
  );
  const data = await response.json();
  console.log(data);
  searchResults.value = data.results;
}

async function addGameToFirestore(game: Game) {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    console.error('No user is logged in');
    return;
  }

  const userId = user.uid;
  const gameData: Game = {
    // Ensure gameData conforms to the Game model
    name: game.name,
    id: game.id,
    genres: game.genres.map((genre) => ({ name: genre.name })), // Ensure genres match the Game model
    platforms: game.platforms.map((platform) => ({
      platform: { name: platform.platform.name }
    })),
    background_image: game.background_image
    // Add other game details as needed
  };

  console.log('Adding game to Firestore for user:', userId, gameData);

  try {
    await addDoc(collection(db, 'users', userId, 'games'), gameData);
    alert(game.name + ' added to your collection!');
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}
</script>

<style>
.cursorPointer:hover {
  cursor: pointer;
}
</style>
