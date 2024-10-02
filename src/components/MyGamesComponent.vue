<template>
  <h2 class="my-5 text-center text-3xl text-orange-600 font-bold">
    My Collection
  </h2>
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
                :key="game.gameFbId"
                :game="game"
                class="border-b border-gray-200 hover:bg-gray-100"
              >
                <td class="py-3 px-6 text-left whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="mr-2"></div>
                    <span class="font-medium">{{ game.name }}</span>
                  </div>
                </td>
                <td class="py-3 px-6 text-left">
                  <div class="flex items-center">
                    <span>{{
                      game.platforms.map((p) => p.platform.name).join(', ')
                    }}</span>
                  </div>
                </td>

                <td class="py-3 px-6 text-center">
                  <div class="flex items-center justify-center">
                    {{ game.genres.map((g) => g.name).join(', ') }}
                  </div>
                </td>

                <td class="py-3 px-6 text-center">
                  <select
                    v-model="game.completionStatus"
                    :class="game.completionStatus"
                    class="py-1 px-3 rounded-full text-xs"
                    @change="
                      selectProgress(game.gameFbId, game.completionStatus)
                    "
                  >
                    <option
                      v-for="progressOption in ProgressOptions"
                      :key="progressOption.value"
                      :value="progressOption.value"
                    >
                      {{ progressOption.value }}
                    </option>
                  </select>
                </td>

                <td class="py-3 px-6 text-center">
                  <div class="flex item-center justify-center">
                    <EyeIcon
                      class="w-5 mr-2 transform hover:text-purple-500 hover:scale-110 cursorPointer"
                    />
                    <TrashIcon
                      class="w-5 mr-2 transform hover:text-purple-500 hover:scale-110 cursorPointer"
                      @click="deleteGame(game.gameFbId)"
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
import { ref } from 'vue';
import { TrashIcon } from '@heroicons/vue/24/solid';
import { EyeIcon } from '@heroicons/vue/24/solid';
import type { Game } from '@/models/models';

defineProps<{
  myGamesList: Game[];
}>();

const ProgressOptions = ref([
  { value: 'Pending' },
  { value: 'Active' },
  { value: 'Completed' }
]);

const emit = defineEmits(['deleteGame', 'selectProgress']);
function deleteGame(gameFbId: string | undefined) {
  emit('deleteGame', gameFbId);
}

function selectProgress(
  gameFbId: string | undefined,
  gameCompletionStatus: string | undefined
) {
  emit('selectProgress', gameFbId, gameCompletionStatus);
}
</script>

<style>
.cursorPointer:hover {
  cursor: pointer;
}

/* Need method that takes GCstatus as parameter and returns class based on each status */
/* Custom tailwind classes for class binding - see if there's a better way to just use tailwind classes conditionally */
.Pending {
  --tw-bg-opacity: 1;
  background-color: rgb(233 213 255 / var(--tw-bg-opacity));
  --tw-text-opacity: 1;
  color: rgb(147 51 234 / var(--tw-text-opacity));
}

.Completed {
  --tw-bg-opacity: 1;
  background-color: rgb(254 202 202 / var(--tw-bg-opacity));
  --tw-text-opacity: 1;
  color: rgb(220 38 38 / var(--tw-text-opacity));
}

.Active {
  --tw-bg-opacity: 1;
  background-color: rgb(187 247 208 / var(--tw-bg-opacity));
  --tw-text-opacity: 1;
  color: rgb(22 163 74 / var(--tw-text-opacity));
}
</style>
