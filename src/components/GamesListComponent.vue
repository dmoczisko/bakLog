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

  <button @click="addGameToMaster()"></button>
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
async function addGameToMaster() {
  masterGamesList.forEach(async (game) => {
    console.log('Adding game: ');
    try {
      await addDoc(collection(db, 'mainlist'), game);
    } catch (error) {
      console.log(error);
    }
  });
}

const masterGamesList: Game[] = reactive([
  {
    Game: '3 Ninjas Kick Back',
    GameLink: 'https://en.wikipedia.org/wiki/3_Ninjas_Kick_Back_(video_game)',
    Year: 1994,
    Dev: 'Malibu Interactive',
    DevLink: 'https://en.wikipedia.org/wiki/Malibu_Comics',
    Publisher: 'Sony Imagesoft',
    PublisherLink: 'https://en.wikipedia.org/wiki/Sony_Imagesoft',
    Platform: 'the SNES',
    PlatformLink:
      'https://en.wikipedia.org/wiki/Super_Nintendo_Entertainment_System'
  },
  {
    Game: '3rd Super Robot Wars',
    GameLink: 'https://en.wikipedia.org/wiki/3rd_Super_Robot_Wars',
    Year: 1993,
    Dev: 'Banpresto',
    DevLink: 'https://en.wikipedia.org/wiki/Banpresto',
    Publisher: 'Banpresto',
    PublisherLink: null,
    Platform: 'the SNES',
    PlatformLink:
      'https://en.wikipedia.org/wiki/Super_Nintendo_Entertainment_System'
  },
  {
    Game: '3×3 Eyes Jūma hōkan',
    GameLink: 'https://en.wikipedia.org/wiki/3×3_Eyes#Video_games',
    Year: 1995,
    Dev: 'System Supply N-Tech',
    DevLink: null,
    Publisher: 'Banpresto',
    PublisherLink: 'https://en.wikipedia.org/wiki/Banpresto',
    Platform: 'the SNES',
    PlatformLink:
      'https://en.wikipedia.org/wiki/Super_Nintendo_Entertainment_System'
  },
  {
    Game: '3×3 Eyes Seima kōrin-den',
    GameLink: 'https://en.wikipedia.org/wiki/3×3_Eyes#Video_games',
    Year: 1992,
    Dev: 'Nova Games',
    DevLink: null,
    Publisher: 'Yutaka',
    PublisherLink: 'https://en.wikipedia.org/wiki/Yutaka_(video_game_company)',
    Platform: 'the SNES',
    PlatformLink:
      'https://en.wikipedia.org/wiki/Super_Nintendo_Entertainment_System'
  },
  {
    Game: '4 Nin Shōgi',
    GameLink: 'https://en.wikipedia.org/wiki/4_Nin_Shōgi',
    Year: 1995,
    Dev: 'Planning Office Wada',
    DevLink:
      'https://en.wikipedia.org/w/index.php?title=Planning_Office_Wada&action=edit&redlink=1',
    Publisher: 'Planning Office Wada',
    PublisherLink: null,
    Platform: 'the SNES',
    PlatformLink:
      'https://en.wikipedia.org/wiki/Super_Nintendo_Entertainment_System'
  },
  {
    Game: '4th Super Robot Wars',
    GameLink: 'https://en.wikipedia.org/wiki/4th_Super_Robot_Wars',
    Year: 1995,
    Dev: 'Banpresto',
    DevLink: 'https://en.wikipedia.org/wiki/Banpresto',
    Publisher: 'Banpresto',
    PublisherLink: null,
    Platform: 'the SNES',
    PlatformLink:
      'https://en.wikipedia.org/wiki/Super_Nintendo_Entertainment_System'
  },
  {
    Game: 'The 7th Saga - •ElnardJP',
    GameLink: 'https://en.wikipedia.org/wiki/The_7th_Saga',
    Year: 1993,
    Dev: 'Produce',
    DevLink: 'https://en.wikipedia.org/wiki/Produce_(company)',
    Publisher: 'Gameplan21 (JP) - Enix (NA)',
    PublisherLink: null,
    Platform: 'the SNES',
    PlatformLink:
      'https://en.wikipedia.org/wiki/Super_Nintendo_Entertainment_System'
  },
  {
    Game: '90 Minutes European Prime Goal - •J.League Soccer Prime Goal 3JP',
    GameLink: 'https://en.wikipedia.org/wiki/90_Minutes_European_Prime_Goal',
    Year: 1995,
    Dev: 'Namco',
    DevLink: 'https://en.wikipedia.org/wiki/Namco',
    Publisher: 'Namco (JP) - Ocean Software (EU)',
    PublisherLink: 'https://en.wikipedia.org/wiki/Ocean_Software (EU)',
    Platform: 'the SNES',
    PlatformLink:
      'https://en.wikipedia.org/wiki/Super_Nintendo_Entertainment_System'
  },
  {
    Game: 'A.S.P. Air Strike Patrol - •Desert FighterEU - •Desert Fighter: Suna no Arashi SakusenJP',
    GameLink: 'https://en.wikipedia.org/wiki/A.S.P._Air_Strike_Patrol',
    Year: 1994,
    Dev: 'SETA',
    DevLink: 'https://en.wikipedia.org/wiki/SETA_Corporation',
    Publisher: 'SETA (JP/NA) - System 3 (EU)',
    PublisherLink: 'https://en.wikipedia.org/wiki/System_3_(company) (EU)',
    Platform: 'the SNES',
    PlatformLink:
      'https://en.wikipedia.org/wiki/Super_Nintendo_Entertainment_System'
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
