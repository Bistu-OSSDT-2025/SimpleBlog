<script setup>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div id="app">
    <Navbar />
    <main class="main-content">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  width: 100%;
  overflow-x: hidden;
}

body {
  margin: 0 !important;
  padding: 0 !important;
  background-color: #f8f9fa !important;
  width: 100% !important;
  overflow-x: hidden;
  display: block !important;
  place-items: unset !important;
}

#app {
  min-height: 100vh !important;
  display: flex !important;
  flex-direction: column !important;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  background-color: #f8f9fa !important;
  max-width: none !important;
  margin: 0 !important;
  padding: 0 !important;
  grid-template-columns: none !important;
  place-items: unset !important;
  width: 100% !important;
  font-weight: normal;
}

.main-content {
  flex: 1;
  width: 100%;
  min-height: calc(100vh - 140px);
  background-color: #f8f9fa;
}
</style>
