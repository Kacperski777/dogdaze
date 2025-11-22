<template>
  <nav class="bg-white shadow-md">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <!-- Logo/Brand -->
        <router-link to="/" class="flex items-center space-x-2">
          <span class="text-2xl font-bold text-green-700">DogDaze</span>
        </router-link>

        <!-- Navigation Links -->
        <div class="hidden md:flex items-center space-x-6">
          <router-link
            to="/"
            class="text-gray-700 hover:text-green-700 transition"
            active-class="text-green-700 font-semibold"
          >
            Home
          </router-link>
          <router-link
            to="/venues"
            class="text-gray-700 hover:text-green-700 transition"
            active-class="text-green-700 font-semibold"
          >
            Venues
          </router-link>
        </div>

        <!-- User Menu -->
        <div class="flex items-center space-x-4">
          <div v-if="user" class="flex items-center space-x-4">
            <router-link
              to="/profile"
              class="text-gray-700 hover:text-green-700 transition flex items-center space-x-2"
            >
              <span>{{ user.user_metadata?.full_name || user.email?.split('@')[0] }}</span>
            </router-link>
            <button
              @click="handleSignOut"
              class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Sign Out
            </button>
          </div>
          <div v-else class="flex items-center space-x-2">
            <router-link
              to="/auth/login"
              class="px-4 py-2 text-gray-700 hover:text-green-700 transition"
            >
              Sign In
            </router-link>
            <router-link
              to="/auth/signup"
              class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
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
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { user, signOut } = useAuth()

const handleSignOut = async () => {
  await signOut()
}
</script>