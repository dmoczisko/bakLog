<template>
  <!-- importing my games into games list component -->
  <MyGames @delete-game="deleteGameFromCollection" :myGamesList="myGamesList" />
  <!-- importing my games into games list component -->

  <!-- importing master games into games list component -->
  <MasterGames
    @add-game="addGameToCollection"
    :masterGamesList="masterGamesList"
  />
  <!-- importing master games into games list component -->
</template>

<script setup lang="ts">
import { useStoreAuth } from '@/stores/storeAuth';
import { reactive, onMounted } from 'vue';
import { db } from '@/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';

import type { Game } from '@/models/models';
import MyGames from '@/components/MyGamesComponent.vue';
import MasterGames from '@/components/MasterGamesComponent.vue';

const storeAuth = useStoreAuth();
const myGamesList: Game[] = reactive([]);

onMounted(async () => {
  const querySnapshot = await getDocs(
    collection(db, `users/${storeAuth.user.id}/games`)
  );
  // fb idea property on object that corresponds to fb doc id
  querySnapshot.forEach((doc) => {
    const game = {
      ...doc.data()
    } as Game;
    myGamesList.push(game);
  });
});

// Import from Firebase when ready
const masterGamesList: Game[] = reactive([
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
  },
  {
    gameId: 3,
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
    gameId: 4,
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
    gameId: 5,
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
    gameId: 6,
    title: 'Beetle Adventure Racing',
    releaseYear: 1999,
    releaseDate: 'Mar 24, 1999',
    genre: 'Racing',
    platforms: 'Nintendo 64',
    description: 'Racing Game',
    rating: '72',
    completionStatus: 'Pending'
  },
  {
    gameId: 7,
    title: "Army Men Sarge's Heroes",
    releaseYear: 2001,
    releaseDate: 'Mar 31st, 2001',
    genre: 'Shooter, Platformer',
    platforms: 'Nintendo 64',
    description: 'Army Men Game',
    rating: '76',
    completionStatus: 'Complete'
  }
]);

// fetch(
//   'https://www.pricecharting.com/api/products?t=c0b53bce27c1bdab90b1605249e600dc43dfd1d5&q=mario'
// )
//   .then((response) => response.json())
//   .then((data) => console.log(data));
// .then((data) => masterGamesList.push(data));

// const masterGamesList: Game[] = reactive([]);

async function addGameToCollection(game: Game) {
  console.log('add button clicked');

  // Check if game already exists in users collection, if does throw error
  // If not, go ahead and add it to users collection
  try {
    const docRef = await addDoc(
      collection(db, 'users/LFXi1Hcnx6SYjOAWi4L6vkWpDXD2/games'),
      game
    );
    console.log(docRef.id);
    // Getting firebase doc id and pushing it to the client side object
    // this lets users delete games immediately after adding if needed
    // game.firebaseId = docRef.id;
    myGamesList.push(game);
  } catch (error) {
    console.log(error);
  }
}

// refactor to delete by firebase ID NOT game id - async with await like adding doc
function deleteGameFromCollection(gameId: number) {
  const gameIndex = myGamesList.findIndex((game) => game.gameId === gameId);
  myGamesList.splice(gameIndex, 1);
}
</script>

<style>
.cursorPointer:hover {
  cursor: pointer;
}
</style>
