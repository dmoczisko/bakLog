<template>
  <!-- <button @click="addGameToMain()">Add to main</button> -->

  <MyGames
    v-if="route.name === 'my-games'"
    @delete-game="deleteGameFromCollection"
    :myGamesList="myGamesList"
    @select-progress="updateProgressFromCollection"
  />
  <MainGames
    v-else-if="route.name === 'main-collection'"
    @add-game="addGameToCollection"
    @submit-query="searchQuery"
    :mainGamesList="mainGamesList"
  />

  <div class="flex justify-center">
    <button
      class="my-5 bg-transparent hover:bg-orange-500 text-orange-700 font-semibold hover:text-white py-2 px-4 border border-orange-500 hover:border-transparent rounded"
      @click="pageNext()"
    >
      Load More
    </button>
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
import type { MainGame } from '@/models/models';
import MyGames from '@/components/MyGamesComponent.vue';
import MainGames from '@/components/MainGamesComponent.vue';

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

  // Gets main collection from firebase
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
    const MainGame = {
      ...doc.data()
    } as MainGame;
    mainGamesList.push(MainGame);
  });
  lastVisible = querySnapshotSearch.docs[querySnapshotSearch.docs.length - 1];
});

// This is a helper function that requires a custom JSON array to be placed in mainGamesList using the MainGame[] array
// A button needs to be added to trigger this manually, this is ONLY for importing data into firebase

// <button @click="addGameToMain()">Add to main</button>

// async function addGameToMain() {
//   mainGamesList.forEach(async (MainGame) => {
//     try {
//       await addDoc(collection(db, 'mainlist'), MainGame);
//     } catch (error) {
//       console.log(error);
//     }
//   });
// }

// query from Firebase
const mainGamesList: MainGame[] = reactive([]);
// query from Firebase

// Load Next 15 games
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
    const MainGame = {
      ...doc.data()
    } as MainGame;
    mainGamesList.push(MainGame);
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

async function searchQuery(searchQuery: string) {
  console.log('Search query is:', searchQuery);
  // query firebase with text string and see what happens
}
</script>

<style>
.cursorPointer:hover {
  cursor: pointer;
}
</style>
