<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 text-white py-20 lg:py-32">
      <div class="absolute inset-0 bg-black opacity-10"></div>
      <div class="container mx-auto px-4 relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="animate-fade-in">
            <h1 class="text-5xl lg:text-6xl font-bold mb-6" style="font-family: var(--font-display);">
              Explore the Country.<br />
              <span class="text-emerald-100">Together.</span>
            </h1>
            <p class="text-xl text-emerald-50 mb-8">
              We've curated the best dog-friendly places the UK has to offer. 
              Discover restaurants, pubs, groomers, and experiences perfect for you and your furry friend.
            </p>
            <div class="flex flex-wrap gap-4">
              <router-link
                to="/venues"
                class="px-8 py-4 bg-white text-emerald-600 font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                Explore Venues
              </router-link>
              <button
                class="px-8 py-4 bg-emerald-600 bg-opacity-30 backdrop-blur-sm text-white font-semibold rounded-lg border-2 border-white hover:bg-opacity-50 transition-all duration-200"
              >
                Learn More
              </button>
            </div>
          </div>
          <div class="hidden lg:block animate-float">
            <img 
            src="../assets/dog-walking-amico.svg" 
              alt="Dog walking illustration"
              class="w-full max-w-lg mx-auto"
             
            />
          </div>
        </div>
      </div>
      <!-- Decorative waves -->
      <div class="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
        </svg>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16 animate-fade-in">
          <h2 class="text-4xl font-bold mb-4" style="font-family: var(--font-display);">
            Why Choose DogDaze?
          </h2>
          <p class="text-gray-600 text-lg max-w-2xl mx-auto">
            Everything you need to plan the perfect day out with your dog
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div 
            v-for="(feature, index) in features" 
            :key="index"
            class="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <div class="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center mb-4">
              <span class="text-3xl">{{ feature.icon }}</span>
            </div>
            <h3 class="text-xl font-bold mb-2" style="font-family: var(--font-display);">
              {{ feature.title }}
            </h3>
            <p class="text-gray-600">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16 animate-fade-in">
          <h2 class="text-4xl font-bold mb-4" style="font-family: var(--font-display);">
            Discover by Category
          </h2>
          <p class="text-gray-600 text-lg">
            Find the perfect place for any occasion
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="(category, index) in categories" 
            :key="index"
            class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
            @click="$router.push('/venues')"
          >
            <div class="h-48 bg-gradient-to-br" :class="category.gradient">
              <div class="h-full flex items-center justify-center">
                <span class="text-6xl">{{ category.icon }}</span>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-bold mb-2" style="font-family: var(--font-display);">
                {{ category.name }}
              </h3>
              <p class="text-gray-600">
                {{ category.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
      <div class="container mx-auto px-4 text-center">
        <div class="max-w-3xl mx-auto animate-fade-in">
          <h2 class="text-4xl font-bold mb-6" style="font-family: var(--font-display);">
            Ready to Start Exploring?
          </h2>
          <p class="text-xl text-emerald-50 mb-8">
            Join thousands of dog lovers discovering amazing places across the UK
          </p>
          <router-link
            to="/venues"
            class="inline-block px-8 py-4 bg-white text-emerald-600 font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Browse Venues
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import anime from 'animejs/lib/anime.es.js'

const features = ref([
  {
    icon: '🍽️',
    title: 'Restaurants',
    description: 'Find dog-friendly dining spots where your pup is welcome'
  },
  {
    icon: '🍺',
    title: 'Pubs & Bars',
    description: 'Discover cozy pubs perfect for a drink with your dog'
  },
  {
    icon: '✂️',
    title: 'Groomers',
    description: 'Book grooming appointments at top-rated salons'
  },
  {
    icon: '🎯',
    title: 'Experiences',
    description: 'Plan unforgettable adventures with your furry friend'
  }
])

const categories = ref([
  {
    name: 'Restaurants',
    icon: '🍽️',
    description: 'Dog-friendly dining experiences',
    gradient: 'from-amber-400 to-orange-500'
  },
  {
    name: 'Pubs & Bars',
    icon: '🍺',
    description: 'Relax with your dog at local pubs',
    gradient: 'from-emerald-400 to-teal-500'
  },
  {
    name: 'Groomers',
    icon: '✂️',
    description: 'Professional grooming services',
    gradient: 'from-pink-400 to-rose-500'
  },
  {
    name: 'Experiences',
    icon: '🎯',
    description: 'Adventure activities for dogs',
    gradient: 'from-purple-400 to-indigo-500'
  },
  {
    name: 'Coffee Houses',
    icon: '☕',
    description: 'Perfect spots for a coffee break',
    gradient: 'from-amber-300 to-yellow-400'
  },
  {
    name: 'Parks',
    icon: '🌳',
    description: 'Beautiful parks and outdoor spaces',
    gradient: 'from-green-400 to-emerald-500'
  }
])

onMounted(() => {
  // Animate features on scroll
  anime({
    targets: '.animate-fade-in',
    opacity: [0, 1],
    translateY: [30, 0],
    duration: 800,
    easing: 'easeOutExpo',
    delay: anime.stagger(100)
  })
})
</script>