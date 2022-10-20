<template>
  <h2 class="my-5 text-center text-3xl text-red-600">My Collection</h2>
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
              <!-- make v-for to call json -->

              <tr
                v-for="game in myGamesList"
                :key="game.gameId"
                class="border-b border-gray-200 hover:bg-gray-100"
              >
                <td class="py-3 px-6 text-left whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="mr-2"></div>
                    <span class="font-medium">{{ game.title }}</span>
                  </div>
                </td>
                <td class="py-3 px-6 text-left">
                  <div class="flex items-center">
                    <span>{{ game.platforms }}</span>
                  </div>
                </td>

                <td class="py-3 px-6 text-center">
                  <div class="flex items-center justify-center">
                    {{ game.genre }}
                  </div>
                </td>

                <td class="py-3 px-6 text-center">
                  <span
                    class="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs"
                    >{{ game.completionStatus }}</span
                  >
                </td>
                <td class="py-3 px-6 text-center">
                  <div class="flex item-center justify-center">
                    <EyeIcon
                      class="w-5 mr-2 transform hover:text-purple-500 hover:scale-110"
                    />
                    <TrashIcon
                      @click="deleteGame(game.gameId, game.title)"
                      class="w-5 mr-2 transform hover:text-purple-500 hover:scale-110 cursorPointer"
                    />
                  </div>
                </td>
              </tr>

              <!-- make v-for to call json -->
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { TrashIcon } from '@heroicons/vue/24/solid';
import { EyeIcon } from '@heroicons/vue/24/solid';

const myGamesList = ref([
  {
    gameId: 1,
    title: 'Super Mario 64',
    releaseYear: 1996,
    releaseDate: 'June 23, 1996',
    genre: 'Adventure, Platform',
    platforms: 'Wii U, Wii, Nintendo 64',
    description:
      "The first three dimensional entry in the Mario franchise, Super Mario 64 follows Mario as he puts his broadened 3D movement arsenal to use in order to rescue Princess Peach from the clutches of his arch rival Bowser. Mario has to jump into worlds-within-paintings ornamenting the walls of Peach's castle, uncover secrets and hidden challenges and collect golden stars as reward for platforming trials.",
    rating: '90',
    completionStatus: 'Pending'
  },
  {
    gameId: 2,
    title: 'The Legend of Zelda: Ocarina of Time',
    releaseYear: 1998,
    releaseDate: 'Nov 21, 1998',
    genre: 'Adventure, Platform',
    platforms: 'Wii U, Wii, Nintendo 64',
    description:
      'A 3D reimagining of the core premise of The Legend of Zelda: A Link to the Past (1991), Ocarina of Time follows Link, the protagonist, as he picks up a sword and leaves behind his humble origins in order to trek across the land of Hyrule, venture into its treacherous dungeons and travel through time itself to fulfill his destiny as the Hero of Time by defeating his enemy Ganondorf and ridding Hyrule of evil.',
    rating: '92',
    completionStatus: 'Completed'
  }
]);

function deleteGame(gameId: number, gameTitle: string) {
  console.log('deleted: ', gameTitle);
  const gameIndex = myGamesList.value.findIndex(
    (game) => game.gameId === gameId
  );
  myGamesList.value.splice(gameIndex, 1);
}
</script>
