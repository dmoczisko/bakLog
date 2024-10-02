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
      <button
        v-if="hasSearched"
        class="px-4 text-white bg-blue-600 border-l hover:bg-blue-500"
        @click="resetSearch"
      >
        Reset
      </button>
    </div>
  </div>

  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-16"
  >
    <div
      v-for="game in gamesToDisplay"
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
          {{
            game.platforms
              .map((p) => (typeof p === 'string' ? p : p.platform.name))
              .join(', ')
          }}
        </p>
        <p class="text-sm text-gray-600 mb-2">
          <strong>Genres:</strong>
          {{ game.genres.map((g) => g.name).join(', ') }}
        </p>
        <div class="flex justify-between items-center mt-4">
          <PlusIcon
            class="w-5 h-5 text-orange-600 hover:text-orange-500 cursor-pointer"
            @click="addGame(game)"
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
import { onMounted, ref, computed } from 'vue';
import { PlusIcon } from '@heroicons/vue/24/solid';
import { EyeIcon } from '@heroicons/vue/24/solid';
import type { Game } from '../models/models';

defineProps<{
  mainGamesList: Game[];
}>();

const searchQuery = ref('');
const searchResults = ref<Game[]>([]);
const fetchGamesOnLoad = ref<Game[]>([]);
const hasSearched = ref(false);

const emit = defineEmits(['addGame', 'submitQuery']);
const gamesToDisplay = computed(() => {
  return hasSearched.value ? searchResults.value : fetchGamesOnLoad.value;
});

async function fetchPopularGames() {
  const apiKey = import.meta.env.VITE_RAWG_API_KEY;
  const response = await fetch(
    `https://api.rawg.io/api/games?key=${apiKey}&ordering=-rating&page_size=8`
  );
  const data = await response.json();

  // Store the first 8 or most popular games
  fetchGamesOnLoad.value = data.results;
}

onMounted(() => {
  fetchPopularGames();
});

async function submitQuery(query: string) {
  emit('submitQuery', query);
  const apiKey = import.meta.env.VITE_RAWG_API_KEY;
  const response = await fetch(
    `https://api.rawg.io/api/games?key=${apiKey}&search=${query}`
  );
  const data = await response.json();
  // console.log(data);
  searchResults.value = data.results.slice(0, 5);
  hasSearched.value = true;
}

function resetSearch() {
  searchResults.value = [];
  hasSearched.value = false;
  searchQuery.value = '';
}

function addGame(game: Game) {
  emit('addGame', game);
}
</script>

<style>
.cursorPointer:hover {
  cursor: pointer;
}
</style>
