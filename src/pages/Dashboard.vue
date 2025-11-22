<template>
  <div class="min-h-screen">
    <!-- Dashboard content for logged-in users -->
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-4xl font-bold mb-6" style="font-family: var(--font-display);">
        Welcome Back!
      </h1>
      <p class="text-gray-600">
        Dashboard content will go here...
      </p>
    </div>
  </div>
</template>

<script setup>
import { useAuth } from '../composables/useAuth'

const { user } = useAuth()
</script>

