<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-emerald-50 text-gray-800">
    <Navbar />
    <main class="flex-1 container mx-auto px-4 py-8">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
</script>
