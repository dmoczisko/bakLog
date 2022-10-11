<template>
  <h2 class="my-5 text-center text-3xl text-red-600">Games List</h2>
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
                class="border-b border-gray-200 hover:bg-gray-100"
                v-for="games in games_list"
                :key="games.title"
              >
                <td class="py-3 px-6 text-left whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="mr-2"></div>
                    <span class="font-medium">{{ games.title }}</span>
                  </div>
                </td>
                <td class="py-3 px-6 text-left">
                  <div class="flex items-center">
                    <span>{{ games.platforms }}</span>
                  </div>
                </td>

                <td class="py-3 px-6 text-center">
                  <div class="flex items-center justify-center">
                    {{ games.genre }}
                  </div>
                </td>

                <td class="py-3 px-6 text-center">
                  <span
                    class="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs"
                    >{{ games.completionStatus }}</span
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
                      class="w-5 mr-2 transform hover:text-purple-500 hover:scale-110"
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
// import { ref } from 'vue';
//const currentYear = new Date().getFullYear();

// Get years since release - refactor later
// console.log(currentYear - game_details.releaseYear);

import { PlusIcon } from '@heroicons/vue/24/solid';
import { TrashIcon } from '@heroicons/vue/24/solid';
import { EyeIcon } from '@heroicons/vue/24/solid';

// Pull from list in firebase
const games_list = [
  {
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
    title: 'The Legend of Zelda: Ocarina of Time',
    releaseYear: 1998,
    releaseDate: 'Nov 21, 1998',
    genre: 'Adventure, Platform',
    platforms: 'Wii U, Wii, Nintendo 64',
    description:
      'A 3D reimagining of the core premise of The Legend of Zelda: A Link to the Past (1991), Ocarina of Time follows Link, the protagonist, as he picks up a sword and leaves behind his humble origins in order to trek across the land of Hyrule, venture into its treacherous dungeons and travel through time itself to fulfill his destiny as the Hero of Time by defeating his enemy Ganondorf and ridding Hyrule of evil.',
    rating: '92',
    completionStatus: 'Completed'
  },
  {
    title: 'GoldeneEye 007',
    releaseYear: 1997,
    releaseDate: 'Aug 23, 1997',
    genre: 'Adventure, Shooter',
    platforms: 'Nintendo 64',
    description:
      'GoldenEye 007 is a first-person shooter video game developed by Rare and based on the 1995 James Bond film GoldenEye. It was exclusively released for the Nintendo 64 video game console in August 1997.',
    rating: '92',
    completionStatus: 'Active'
  },
  {
    title: 'Buck Bumble',
    releaseYear: 1998,
    releaseDate: 'Sep 30, 1998',
    genre: 'Shooter',
    platforms: 'Nintendo 64',
    description:
      'A chemical spill somewhere in rural England has mutated an army of bees into killer insects! Led by their queen, they are out to destroy everything living thing on the planet, including all insects that dare stop them. Only Buck Bumble, the only bee not to be turned evil by the ways of the queen, can save the world, and his fellow insects, from total destruction. Shoot down swarms of enemy bees, while flying and avoiding the hazards bellow or land on the ground and attack the enemies on foot with various weapons. Also included are a handful of two-player split-screen modes, including Buzz Ball, a unique soccer style game.',
    rating: '75',
    completionStatus: 'Completed'
  },
  {
    title: 'Jet Force Gemini',
    releaseYear: 1999,
    releaseDate: 'Oct 11, 1999',
    genre: 'Adventure, Platform, Shooter',
    platforms: 'Nintendo 64',
    description:
      "The insect invasion has begun. The galaxy is being infested by the evil Mizar and his horde of Drones. Already, the planet of Goldwood has been subjugated and the peaceful Tribals enslaved. With an arsenal of mega-weapons at their disposal, the Jet Force Gemini team must travel in search of Mizar's lair - rescuing Tribals and splattering Drones along the way. But can Juno, Vela and their faithful dog, Lupus, exterminate the deadly threat before it's too late?",
    rating: '89',
    completionStatus: 'Scheduled'
  },
  {
    title: 'Beetle Adventure Racing',
    releaseYear: 1999,
    releaseDate: 'Mar 24, 1999',
    genre: 'Racing',
    platforms: 'Nintendo 64',
    description: 'Racing Game',
    rating: '72',
    completionStatus: 'Pending'
  }
];
</script>
