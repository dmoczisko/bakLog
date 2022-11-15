<template>
  <!-- TAILWIND IMPORT -->

  <!--Hero-->
  <div
    class="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center"
  >
    <!--Left Col-->
    <div
      class="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left"
    >
      <h1 class="my-4 text-5xl font-bold leading-tight text-zinc-100">
        It's dangerous to go alone, take this!
      </h1>
      <p class="leading-normal text-2xl mb-8 text-stone-50">
        Track your game completion status, all in one place and finally finish
        that backlog you've been working on!
      </p>
      <button
        @click="googleLogin()"
        role="button"
        class="mx-auto lg:mx-0 hover:bg-slate-300 bg-slate-200 text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
      >
        Sign Up with Google
      </button>
    </div>
    <!--Right Col-->
    <div class="w-full md:w-3/5 py-6 text-center">
      <img class="w-full md:w-4/5" src="@/assets/svg/videogamenight.svg" />
    </div>
  </div>
  <div class="relative -mt-12 lg:-mt-24">
    <img src="@/assets/svg/wave-bottom.svg" />
  </div>
  <section class="bg-white border-b py-8">
    <div class="container max-w-5xl mx-auto m-8">
      <h2
        class="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800"
      >
        Backlog Management
      </h2>
      <div class="w-full mb-4">
        <div
          class="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"
        ></div>
      </div>
      <div class="flex flex-wrap">
        <div class="w-5/6 sm:w-1/2 p-6">
          <h3 class="text-3xl text-gray-800 font-bold leading-none mb-3">
            Track progress
          </h3>
          <p class="text-gray-600 mb-8">
            Track your completion progress across games, platforms and genres.
            Store all completed, pending and currently playing games in one
            centralized location.
          </p>
        </div>
        <div class="w-full sm:w-1/2 p-6">
          <img class="w-full sm:h-64 mx-auto" src="@/assets/svg/library.svg" />
        </div>
      </div>
      <div class="flex flex-wrap flex-col-reverse sm:flex-row">
        <div class="w-full sm:w-1/2 p-6 mt-6">
          <img
            class="w-5/6 sm:h-64 mx-auto"
            src="@/assets/svg/selectplayer.svg"
          />
        </div>
        <div class="w-full sm:w-1/2 p-6 mt-6">
          <div class="align-middle">
            <h3 class="text-3xl text-gray-800 font-bold leading-none mb-3">
              Connect with Friends
            </h3>
            <p class="text-gray-600 mb-8">
              See what games your friends are playing, recommend and have
              completed. Give your friends that extra push to complete that
              backlog like they've been trying to do for weeks, months, maybe
              even years.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="bg-gray-100 py-8">
    <div class="container mx-auto px-2 pt-4 pb-12 text-gray-800">
      <h2
        class="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800"
      >
        Pricing
      </h2>
      <h3
        class="w-full my-2 text-3xl font-bold leading-tight text-center text-gray-800"
      >
        Free 99 - And it always will be
      </h3>
      <div class="w-full mb-4">
        <div
          class="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"
        ></div>
      </div>
      <div class="flex flex-col sm:flex-row justify-center pt-12 my-12 sm:my-4">
        <div
          class="flex flex-col w-5/6 lg:w-1/3 mx-auto lg:mx-0 rounded-lg bg-white mt-4 sm:-mt-6 shadow-lg z-10"
        >
          <div
            class="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow"
          >
            <div class="w-full p-8 text-3xl font-bold text-center">
              Your Backlog, Your Way
            </div>
            <div class="h-1 w-full gradient my-0 py-0 rounded-t"></div>
            <ul class="w-full text-center text-base font-bold">
              <li class="border-b py-4">
                Search for games to add to your collection
              </li>
              <li class="border-b py-4">Track game completion status</li>
              <li class="border-b py-4">See what your friends are playing</li>
            </ul>
          </div>
          <div
            class="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6"
          >
            <div class="flex items-center justify-center">
              <button
                @click="googleLogin()"
                role="button"
                class="focus:ring-2 focus:ring-offset-2 focus:ring-orange-700 text-sm font-semibold text-white focus:outline-none bg-red-700 border rounded hover:bg-red-600 p-3 rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
              >
                Sign Up with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- Change the colour #f8fafc to match the previous section colour -->
  <img src="@/assets/svg/wave-top.svg" />
  <section class="container mx-auto text-center py-6 mb-12">
    <h2
      class="w-full my-2 text-5xl font-bold leading-tight text-center text-white"
    >
      More features coming soon!
    </h2>
    <div class="w-full mb-4">
      <div
        class="h-1 mx-auto bg-white w-1/6 opacity-25 my-0 py-0 rounded-t"
      ></div>
    </div>
    <h3 class="my-4 text-3xl leading-tight">
      If you would like to see a feature added or you find a bug, please let me
      know!
    </h3>

    <a
      href="mailto:danny.moczisko@gmail.com?subject = Backlog Feedback&body = Message"
    >
      <button
        class="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
      >
        Email me
      </button>
    </a>
  </section>

  <!-- TAILWIND TEMPLATE IMPORT -->
</template>

<script setup lang="ts">
import { useStoreAuth } from '@/stores/storeAuth';
import { auth } from '@/firebase';

/*store*/
const storeAuth = useStoreAuth();

function googleLogin() {
  storeAuth.registerUser(auth);
}
</script>

<style></style>
