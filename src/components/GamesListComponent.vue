<template>
  <!-- <button @click="addGameToMaster()">Add to master</button> -->

  <MyGames
    v-if="route.name === 'my-games'"
    @delete-game="deleteGameFromCollection"
    :myGamesList="myGamesList"
    @select-progress="updateProgressFromCollection"
  />
  <MasterGames
    v-else-if="route.name === 'master-collection'"
    @add-game="addGameToCollection"
    :masterGamesList="masterGamesList"
  />

  <div class="flex justify-center">
    <button @click="pageNext()">Load More</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { useStoreAuth } from '@/stores/storeAuth';
import { db } from '@/firebase';
import {
  doc,
  collection,
  query,
  orderBy,
  getDocs,
  updateDoc,
  addDoc,
  deleteDoc,
  limit,
  startAfter
} from 'firebase/firestore';

import type { Game } from '@/models/models';
import type { MasterGame } from '@/models/models';
import MyGames from '@/components/MyGamesComponent.vue';
import MasterGames from '@/components/MasterGamesComponent.vue';

const route = useRoute();

const storeAuth = useStoreAuth();
const myGamesList: Game[] = reactive([]);

const mainlistRef = collection(db, 'mainlist');
let lastVisible: any = null;

onMounted(async () => {
  // Gets user docs for user collection
  const querySnapshot = await getDocs(
    collection(db, `users/${storeAuth.user.id}/games`)
  );
  querySnapshot.forEach((doc) => {
    const game = {
      ...doc.data()
    } as Game;
    myGamesList.push(game);
  });

  // Gets master collection from firebase
  //  Sample text query firebase example cannot do full text search
  const q = query(
    mainlistRef,
    orderBy('Game'),
    limit(15)
    // Could take first letter or few letters of string and then pass in here as parameter for a search
    // startAt('T')
  );

  const querySnapshotSearch = await getDocs(q);
  querySnapshotSearch.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, ' => ', doc.data());
    const MasterGame = {
      ...doc.data()
    } as MasterGame;
    masterGamesList.push(MasterGame);
  });

  lastVisible = querySnapshotSearch.docs[querySnapshotSearch.docs.length - 1];
});

// This is a helper function that requires a custom JSON array to be placed in masterGamesList using the MasterGame[] array
// A button needs to be added to trigger this manually, this is ONLY for importing data into firebase

// <button @click="addGameToMaster()">Add to master</button>

// async function addGameToMaster() {
//   masterGamesList.forEach(async (MasterGame) => {
//     try {
//       await addDoc(collection(db, 'mainlist'), MasterGame);
//     } catch (error) {
//       console.log(error);
//     }
//   });
// }

// query from Firebase
const masterGamesList: MasterGame[] = reactive([]);
// query from Firebase

async function pageNext() {
  const q = query(
    mainlistRef,
    orderBy('Game'),
    startAfter(lastVisible),
    limit(15)
  );
  const querySnapshotSearch = await getDocs(q);

  querySnapshotSearch.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, ' => ', doc.data());
    const MasterGame = {
      ...doc.data()
    } as MasterGame;
    masterGamesList.push(MasterGame);
  });

  lastVisible = querySnapshotSearch.docs[querySnapshotSearch.docs.length - 1];
}

async function addGameToCollection(game: Game) {
  // Need Check if game already exists in users collection by document id here, if it does, throw error
  // If not, go ahead and add it to users collection
  try {
    const docRef = await addDoc(
      collection(db, `users/${storeAuth.user.id}/games`),
      game
    );
    // Getting firebase doc id and pushing it to the client side object
    // this lets users delete games immediately after adding, if they need
    game.gameFbId = docRef.id;
    // then here we need to send the docref id to firebase
    await updateDoc(docRef, {
      gameFbId: docRef.id
    });
    myGamesList.push(game);
    alert(game.Game + 'has been added to your collection');
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
