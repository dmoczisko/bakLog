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
              <tr
                v-for="game in myGamesList"
                :key="game.gameId"
                :game="game"
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
                  <select
                    class="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs"
                    name="completionStatus"
                    id="completionStatus"
                  >
                    <option value="pending">Pending</option>
                    <option value="active">Active</option>
                    <option value="complete">Complete</option>
                  </select>
                </td>

                <td class="py-3 px-6 text-center">
                  <div class="flex item-center justify-center">
                    <EyeIcon
                      class="w-5 mr-2 transform hover:text-purple-500 hover:scale-110 cursorPointer"
                    />
                    <TrashIcon
                      @click="deleteGame(game.gameFbId)"
                      class="w-5 mr-2 transform hover:text-purple-500 hover:scale-110 cursorPointer"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TrashIcon } from '@heroicons/vue/24/solid';
import { EyeIcon } from '@heroicons/vue/24/solid';
import type { Game } from '@/models/models';

defineProps<{
  myGamesList: Game[];
}>();

const emit = defineEmits(['deleteGame']);
function deleteGame(gameFbId: any) {
  emit('deleteGame', gameFbId);
}
</script>

<style>
.cursorPointer:hover {
  cursor: pointer;
}

/* pending red
completed green
in progress = purple
*/
</style>
