<script setup lang="ts">
import { RouterView } from 'vue-router';
import Header from './components/HeaderComponent.vue';
import Footer from './components/FooterComponent.vue';
</script>

<template>
  <div class="wrapper min-h-screen">
    <Header />
    <RouterView />
    <Footer />
  </div>
</template>

<style scoped></style>
