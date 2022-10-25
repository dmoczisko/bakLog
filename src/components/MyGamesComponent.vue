<template>
  <tr class="border-b border-gray-200 hover:bg-gray-100">
    <td class="py-3 px-6 text-left whitespace-nowrap">
      <div class="flex items-center">
        <div class="mr-2"></div>
        <span class="font-medium">{{ title }}</span>
      </div>
    </td>
    <td class="py-3 px-6 text-left">
      <div class="flex items-center">
        <span>{{ platforms }}</span>
      </div>
    </td>

    <td class="py-3 px-6 text-center">
      <div class="flex items-center justify-center">
        {{ genre }}
      </div>
    </td>

    <td class="py-3 px-6 text-center">
      <span
        class="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs"
        >{{ completionStatus }}</span
      >
    </td>
    <td class="py-3 px-6 text-center">
      <div class="flex item-center justify-center">
        <EyeIcon
          class="w-5 mr-2 transform hover:text-purple-500 hover:scale-110 cursorPointer"
        />
        <TrashIcon
          @click="deleteGame(gameId, title)"
          class="w-5 mr-2 transform hover:text-purple-500 hover:scale-110 cursorPointer"
        />
      </div>
    </td>
  </tr>
</template>

<script setup lang="ts">
import { TrashIcon } from '@heroicons/vue/24/solid';
import { EyeIcon } from '@heroicons/vue/24/solid';

// can we define this as an object instead and use that? Seems extra verbose to expliclity state each prop
// defineProps(['title', 'platforms', 'genre', 'completionStatus']);
const props = defineProps({
  gameId: Number,
  title: String,
  platforms: String,
  genre: String,
  completionStatus: String
});

const emit = defineEmits(['deleteGame']);
function deleteGame(gameId: any, title: any) {
  emit('deleteGame', gameId, title);
}
</script>

<style>
.cursorPointer:hover {
  cursor: pointer;
}
</style>
