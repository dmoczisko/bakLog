<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useStoreAuth } from '@/stores/storeAuth';
import { onMounted } from 'vue';
import Header from './components/Layout/HeaderComponent.vue';
import Footer from './components/Layout/FooterComponent.vue';

const storeAuth = useStoreAuth();

onMounted(() => {
  storeAuth.init();
});
</script>

<template>
  <div
    class="wrapper min-h-screen"
    :class="{ 'gradient-custom': $route.path == '/login' }"
  >
    <Header />
    <RouterView />
    <Footer />
  </div>
</template>

<style>
.gradient-custom {
  background: linear-gradient(90deg, #db36a4 0%, #f7ff00 100%);
}
</style>
