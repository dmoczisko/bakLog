<template>
  <tr class="border-b border-gray-200 hover:bg-gray-100">
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
          class="w-5 mr-2 transform hover:text-purple-500 hover:scale-110"
        />
        <EyeIcon
          class="w-5 mr-2 transform hover:text-purple-500 hover:scale-110"
        />
        <TrashIcon
          @click.prevent="storeNeedToPlay.deleteGame(game.gameId)"
          class="w-5 mr-2 transform hover:text-purple-500 hover:scale-110 cursorPointer"
        />
      </div>
    </td>
  </tr>
</template>

<script setup lang="ts">
import { PlusIcon } from '@heroicons/vue/24/solid';
import { TrashIcon } from '@heroicons/vue/24/solid';
import { EyeIcon } from '@heroicons/vue/24/solid';
import { useStoreNeedToPlay } from '@/stores/storeNeedToPlay';

const storeNeedToPlay = useStoreNeedToPlay();
const props = defineProps({
  game: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
svg:hover {
  cursor: pointer;
}
</style>
