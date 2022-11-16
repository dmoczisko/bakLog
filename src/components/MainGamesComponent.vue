<template>
  <h2 class="my-5 text-center text-3xl text-orange-600 font-bold">
    Main Games List
  </h2>

  <div class="flex items-center justify-center my-5">
    <div class="flex border-2 border-slate-200 rounded">
      <input
        v-model="searchQuery"
        type="text"
        class="px-4 py-2 w-96 placeholder:text-slate-900"
        placeholder="Search by Title"
      />
      <button
        @click="submitQuery(searchQuery)"
        class="px-4 text-white bg-orange-600 border-l hover:bg-orange-500"
      >
        Search
      </button>
    </div>
  </div>

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
                <th class="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody class="text-gray-600 text-sm font-light">
              <tr
                v-for="MainGame in mainGamesList"
                :key="MainGame.Game"
                :MainGame="MainGame"
                class="border-b border-gray-200 hover:bg-gray-100"
              >
                <td class="py-3 px-6 text-left whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="mr-2"></div>
                    <span class="font-medium">{{ MainGame.Game }}</span>
                  </div>
                </td>
                <td class="py-3 px-6 text-left">
                  <div class="flex items-center">
                    <span>{{ MainGame.Platform }}</span>
                  </div>
                </td>

                <td class="py-3 px-6 text-center">
                  <div class="flex items-center justify-center">
                    {{ MainGame.Genre }}
                  </div>
                </td>

                <td class="py-3 px-6 text-center">
                  <div class="flex item-center justify-center">
                    <PlusIcon
                      @click="addGame(MainGame)"
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
import { ref } from 'vue';
import { PlusIcon } from '@heroicons/vue/24/solid';
import { EyeIcon } from '@heroicons/vue/24/solid';
import type { MainGame } from '@/models/models';

defineProps<{
  mainGamesList: MainGame[];
}>();

const searchQuery = ref('');

const emit = defineEmits(['addGame', 'submitQuery']);
function addGame(MainGame: MainGame) {
  emit('addGame', MainGame);
}

function submitQuery(searchQuery: string) {
  emit('submitQuery', searchQuery);
}
</script>

<style>
.cursorPointer:hover {
  cursor: pointer;
}
</style>
