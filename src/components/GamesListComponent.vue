<template>
  <MyGames @delete-game="deleteGameFromCollection" :myGamesList="myGamesList" />
  <MasterGames
    @add-game="addGameToCollection"
    :masterGamesList="masterGamesList"
  />
</template>

<script setup lang="ts">
import { useStoreAuth } from '@/stores/storeAuth';
import { reactive, onMounted } from 'vue';
import { db } from '@/firebase';
import {
  doc,
  collection,
  getDocs,
  updateDoc,
  addDoc,
  deleteDoc
} from 'firebase/firestore';

import type { Game } from '@/models/models';
import MyGames from '@/components/MyGamesComponent.vue';
import MasterGames from '@/components/MasterGamesComponent.vue';

const storeAuth = useStoreAuth();
const myGamesList: Game[] = reactive([]);

onMounted(async () => {
  const querySnapshot = await getDocs(
    collection(db, `users/${storeAuth.user.id}/games`)
  );
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
    gameFbId: '',
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
    gameFbId: '',
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
    gameFbId: '',
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
    gameFbId: '',
    title: 'Buck Bumble',
    releaseYear: 1998,
    releaseDate: 'Sep 30, 1998',
    genre: 'Shooter',
    platforms: 'Nintendo 64',
    description:
      'A chemical spill somewhere in rural England has mutated an army of bees into killer insects! Led by their queen, they are out to destroy everything living thing on the planet, including all insects that dare stop them. Only Buck Bumble, the only bee not to be turned evil by the ways of the queen, can save the world, and his fellow insects, from total destruction. Shoot down swarms of enemy bees, while flying and avoiding the hazards bellow or land on the ground and attack the enemies on foot with various weapons. Also included are a handful of two-player split-screen modes, including Buzz Ball, a unique soccer style game.',
    rating: '75',
    completionStatus: 'Completed'
  }
]);

async function addGameToCollection(game: Game) {
  console.log('add button clicked');

  // Need Check if game already exists in users collection by document id here, if it does, throw error
  // If not, go ahead and add it to users collection
  try {
    const docRef = await addDoc(
      collection(db, `users/${storeAuth.user.id}/games`),
      game
    );
    // Getting firebase doc id and pushing it to the client side object
    // this lets users delete games immediately after adding if needed
    game.gameFbId = docRef.id;
    // then here we need to send the docref id to firebase
    await updateDoc(docRef, {
      gameFbId: docRef.id
    });
    myGamesList.push(game);
  } catch (error) {
    console.log(error);
  }
}

// Delete game from collection
async function deleteGameFromCollection(gameFbId: string) {
  try {
    await deleteDoc(doc(db, `users/${storeAuth.user.id}/games`, gameFbId));
    const gameIndex = myGamesList.findIndex(
      (game) => game.gameFbId === gameFbId
    );
    myGamesList.splice(gameIndex, 1);
  } catch (error) {
    console.log(error);
  }
}
</script>

<style>
.cursorPointer:hover {
  cursor: pointer;
}
</style>
