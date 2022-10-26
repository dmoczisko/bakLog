<template>
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
              <tr
                v-for="game in masterGamesList"
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
                  <span
                    class="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs"
                    >{{ game.completionStatus }}</span
                  >
                </td>
                <td class="py-3 px-6 text-center">
                  <div class="flex item-center justify-center">
                    <PlusIcon
                      @click="addGame()"
                      class="w-5 mr-2 transform hover:text-purple-500 hover:scale-110 cursorPointer"
                    />
                    <EyeIcon
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

  <!-- make v-for to call json -->
</template>

<script setup lang="ts">
import { PlusIcon } from '@heroicons/vue/24/solid';
import { EyeIcon } from '@heroicons/vue/24/solid';
import type { Game } from '@/models/models';

const props = defineProps<{
  masterGamesList: Game[];
}>();

const emit = defineEmits(['addGame']);
function addGame() {
  // Need to figure out how to get this to push single game
  // object into the myGamesList array
  emit('addGame', props);
}
</script>

<style>
.cursorPointer:hover {
  cursor: pointer;
}
</style>
