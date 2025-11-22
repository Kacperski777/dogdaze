<template>
  <nav class="bg-white shadow-md sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center h-16 lg:h-20">
        <!-- Logo/Brand -->
        <router-link 
          to="/" 
          class="flex items-center space-x-2 group"
          @mouseenter="animateLogo"
        >
          <span class="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent" style="font-family: var(--font-display);">
            🐾 DogDaze
          </span>
        </router-link>

        <!-- Navigation Links -->
        <div class="hidden md:flex items-center space-x-8">
          <router-link
            to="/"
            class="text-gray-700 hover:text-emerald-600 transition-colors font-medium relative group"
            active-class="text-emerald-600"
          >
            Home
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-600 group-hover:w-full transition-all duration-300"></span>
          </router-link>
          <router-link
            to="/venues"
            class="text-gray-700 hover:text-emerald-600 transition-colors font-medium relative group"
            active-class="text-emerald-600"
          >
            Venues
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-600 group-hover:w-full transition-all duration-300"></span>
          </router-link>
        </div>

        <!-- User Menu -->
        <div class="flex items-center space-x-4">
          <div v-if="user" class="flex items-center space-x-4">
            <router-link
              to="/profile"
              class="text-gray-700 hover:text-emerald-600 transition-colors font-medium flex items-center space-x-2 group"
            >
              <div class="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-semibold group-hover:scale-110 transition-transform">
                {{ (user.user_metadata?.full_name || user.email?.split('@')[0] || 'U')[0].toUpperCase() }}
              </div>
              <span class="hidden lg:inline">{{ user.user_metadata?.full_name || user.email?.split('@')[0] }}</span>
            </router-link>
            <button
              @click="handleSignOut"
              class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              Sign Out
            </button>
          </div>
          <div v-else class="flex items-center space-x-2">
            <router-link
              to="/auth/login"
              class="px-4 py-2 text-gray-700 hover:text-emerald-600 transition-colors font-medium"
            >
              Sign In
            </router-link>
            <router-link
              to="/auth/signup"
              class="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg font-medium"
            >
              Sign Up
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import anime from 'animejs/lib/anime.es.js'

const router = useRouter()
const { user, signOut } = useAuth()

const animateLogo = () => {
  anime({
    targets: 'nav .group',
    scale: [1, 1.05, 1],
    duration: 300,
    easing: 'easeOutQuad'
  })
}

const handleSignOut = async () => {
  await signOut()
}

onMounted(() => {
  // Animate nav on mount
  anime({
    targets: 'nav',
    translateY: [-20, 0],
    opacity: [0, 1],
    duration: 600,
    easing: 'easeOutExpo'
  })
})
</script>