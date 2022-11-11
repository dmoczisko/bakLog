<template>
  <MyGames
    @delete-game="deleteGameFromCollection"
    :myGamesList="myGamesList"
    @select-progress="updateProgressFromCollection"
  />
  <MasterGames
    @add-game="addGameToCollection"
    :masterGamesList="masterGamesList"
  />

  <button @click="addGameToMaster()">Add to master</button>
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
import type { MasterGame } from '@/models/models';
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
async function addGameToMaster() {
  masterGamesList.forEach(async (MasterGame) => {
    console.log('Adding game: ');
    try {
      await addDoc(collection(db, 'mainlist'), MasterGame);
    } catch (error) {
      console.log(error);
    }
  });
}

// query from Firebase
const masterGamesList: MasterGame[] = reactive([]);
// query from Firebase

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

// Update Progress field from dropdown on change and push to firebase
async function updateProgressFromCollection(
  gameFbId: string,
  gameCompletionStatus: string
) {
  console.log(gameFbId, gameCompletionStatus);
  await updateDoc(doc(db, `users/${storeAuth.user.id}/games`, gameFbId), {
    completionStatus: gameCompletionStatus
  });
}
</script>

<style>
.cursorPointer:hover {
  cursor: pointer;
}
</style>
