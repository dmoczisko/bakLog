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
                <th class="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody class="text-gray-600 text-sm font-light">
              <tr
                v-for="MasterGame in masterGamesList"
                :key="MasterGame.Game"
                :MasterGame="MasterGame"
                class="border-b border-gray-200 hover:bg-gray-100"
              >
                <td class="py-3 px-6 text-left whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="mr-2"></div>
                    <span class="font-medium">{{ MasterGame.Game }}</span>
                  </div>
                </td>
                <td class="py-3 px-6 text-left">
                  <div class="flex items-center">
                    <span>{{ MasterGame.Platform }}</span>
                  </div>
                </td>

                <td class="py-3 px-6 text-center">
                  <div class="flex items-center justify-center">
                    {{ MasterGame.Genre }}
                  </div>
                </td>

                <td class="py-3 px-6 text-center">
                  <div class="flex item-center justify-center">
                    <PlusIcon
                      @click="addGame(MasterGame)"
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
import type { MasterGame } from '@/models/models';

defineProps<{
  masterGamesList: MasterGame[];
}>();

const emit = defineEmits(['addGame']);
function addGame(MasterGame: MasterGame) {
  emit('addGame', MasterGame);
}
</script>

<style>
.cursorPointer:hover {
  cursor: pointer;
}
</style>
