<template>
  <!-- importing my games into games list component -->
  <MyGames />
  <!-- importing my games into games list component -->

  <!-- this section will eventually be derived from the API json response -->
  <h2 class="my-5 text-center text-3xl text-red-600">Master Games List</h2>
  <div class="overflow-x-auto">
    <div
      class="flex items-center justify-center font-sans overflow-hidden px-16"
    >
      <div class="w-full">
        <div class="bg-white shadow-md rounded">
          <table class="min-w-max w-full table-auto">
            <thead>
              <tr
                class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal"
              >
                <th class="py-3 px-6 text-left">Title</th>
                <th class="py-3 px-6 text-left">Platform(s)</th>
                <th class="py-3 px-6 text-center">Genre</th>
                <th class="py-3 px-6 text-center">Status</th>
                <th class="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody class="text-gray-600 text-sm font-light">
              <GameComponent
                v-for="game in storeNeedToPlay.needToPlay"
                :key="game.title"
                :game="game"
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { ref, computed } from 'vue';
import MyGames from '@/components/MyGamesComponent.vue';
import GameComponent from '@/components/Games/GameComponent.vue';

import { useStoreNeedToPlay } from '@/stores/storeNeedToPlay';
const storeNeedToPlay = useStoreNeedToPlay();
</script>

<style>
.cursorPointer:hover {
  cursor: pointer;
}
</style>
