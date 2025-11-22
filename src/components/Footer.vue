<template>
  <footer class="bg-gray-900 text-gray-300 py-12">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <!-- Brand -->
        <div class="col-span-1 md:col-span-2">
          <h3 class="text-2xl font-bold text-white mb-4" style="font-family: var(--font-display);">
            🐾 DogDaze
          </h3>
          <p class="text-gray-400 mb-4 max-w-md">
            Discover the best dog-friendly places across the UK. 
            From restaurants to parks, we've got you and your furry friend covered.
          </p>
          <div class="flex space-x-4">
            <a href="#" class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors">
              <span class="text-lg">📘</span>
            </a>
            <a href="#" class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors">
              <span class="text-lg">🐦</span>
            </a>
            <a href="#" class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors">
              <span class="text-lg">📷</span>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-white font-semibold mb-4">Quick Links</h4>
          <ul class="space-y-2">
            <li>
              <router-link to="/" class="hover:text-emerald-400 transition-colors">
                Home
              </router-link>
            </li>
            <li>
              <router-link to="/venues" class="hover:text-emerald-400 transition-colors">
                Venues
              </router-link>
            </li>
            <li>
              <router-link to="/profile" v-if="user" class="hover:text-emerald-400 transition-colors">
                Profile
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Support -->
        <div>
          <h4 class="text-white font-semibold mb-4">Support</h4>
          <ul class="space-y-2">
            <li>
              <a href="#" class="hover:text-emerald-400 transition-colors">About Us</a>
            </li>
            <li>
              <a href="#" class="hover:text-emerald-400 transition-colors">Contact</a>
            </li>
            <li>
              <a href="#" class="hover:text-emerald-400 transition-colors">Privacy Policy</a>
            </li>
            <li>
              <a href="#" class="hover:text-emerald-400 transition-colors">Terms & Conditions</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
        <p>&copy; {{ new Date().getFullYear() }} DogDaze. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useAuth } from '../composables/useAuth'

const { user } = useAuth()
</script>