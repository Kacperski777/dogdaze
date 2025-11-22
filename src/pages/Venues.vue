<template>
  <div class="h-[calc(100vh-4rem)] flex flex-col">
    <!-- Search and Filters Bar -->
    <div class="bg-white border-b shadow-sm p-4">
      <div class="container mx-auto">
        <div class="flex flex-col md:flex-row gap-4 items-center">
          <!-- Search Bar -->
          <div class="flex-1 w-full md:max-w-md">
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search venues..."
                class="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
              <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <!-- Category Filters -->
          <div class="flex flex-wrap gap-2">
            <button
              v-for="category in categories"
              :key="category.id"
              @click="toggleCategory(category.id)"
              :class="[
                'px-4 py-2 rounded-lg font-medium transition-all duration-200',
                selectedCategories.includes(category.id)
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              ]"
            >
              <span class="mr-2">{{ category.icon }}</span>
              {{ category.name }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content: List + Map -->
    <div class="flex-1 flex overflow-hidden">
      <!-- Venues List (Left Side) -->
      <div :class="['overflow-y-auto bg-gray-50', showMap ? 'hidden md:block w-full md:w-1/2 lg:w-2/5' : 'block w-full md:w-1/2 lg:w-2/5']">
        <div class="p-4 space-y-4">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h2 class="text-2xl font-bold" style="font-family: var(--font-display);">
                {{ filteredVenues.length }} Venues Found
              </h2>
              <p v-if="!user" class="text-sm text-gray-600 mt-1">
                Showing first 3 venues. <router-link to="/auth/signup" class="text-emerald-600 hover:text-emerald-700 font-medium">Sign up</router-link> to view all {{ filteredVenues.length }} venues.
              </p>
            </div>
            <button
              @click="showMap = !showMap"
              class="md:hidden px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
            >
              {{ showMap ? 'Hide Map' : 'Show Map' }}
            </button>
          </div>

          <!-- Venue Cards -->
          <div
            v-for="(venue, index) in filteredVenues"
            :key="venue.id"
            @click="!isBlurred(venue, index) && selectVenue(venue)"
            :class="[
              'bg-white rounded-xl shadow-md p-6 transition-all duration-200 relative',
              selectedVenue?.id === venue.id ? 'ring-2 ring-emerald-500' : '',
              isBlurred(venue, index) ? 'cursor-default' : 'cursor-pointer hover:shadow-xl transform hover:scale-[1.02]'
            ]"
          >
            <!-- Blur Overlay for non-logged-in users (venues after first 3) -->
            <div
              v-if="isBlurred(venue, index)"
              class="absolute inset-0 bg-white bg-opacity-80 backdrop-blur-md rounded-xl z-10 flex flex-col items-center justify-center p-6"
            >
              <div class="text-center">
                <div class="text-4xl mb-4">🔒</div>
                <h3 class="text-xl font-bold text-gray-800 mb-2" style="font-family: var(--font-display);">
                  Sign Up to View More Venues
                </h3>
                <p class="text-gray-600 text-sm mb-4">
                  Unlock access to all {{ filteredVenues.length }} venues
                </p>
                <router-link
                  to="/auth/signup"
                  class="inline-block px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  Sign Up Free
                </router-link>
              </div>
            </div>

            <!-- Blurred Content -->
            <div :class="{ 'filter blur-sm': isBlurred(venue, index) }">
            <div class="flex gap-4">
              <!-- Venue Image -->
              <div class="w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-gradient-to-br" :class="getCategoryGradient(venue.category)">
                <div class="w-full h-full flex items-center justify-center text-4xl">
                  {{ getCategoryIcon(venue.category) }}
                </div>
              </div>

              <!-- Venue Info -->
              <div class="flex-1 min-w-0">
                <div class="flex items-start justify-between mb-2">
                  <h3 class="text-xl font-bold text-gray-800 truncate" style="font-family: var(--font-display);">
                    {{ venue.name }}
                  </h3>
                  <span class="flex items-center text-yellow-500 ml-2">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span class="ml-1 text-sm font-semibold">{{ venue.rating }}</span>
                  </span>
                </div>
                <p class="text-gray-600 text-sm mb-2 line-clamp-2">{{ venue.description }}</p>
                <div class="flex items-center text-gray-500 text-sm">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span class="truncate">{{ venue.address }}</span>
                </div>
                <div class="flex items-center gap-2 mt-2">
                  <span class="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded">
                    {{ venue.category }}
                  </span>
                  <span v-if="venue.price" class="text-gray-600 text-sm">
                    {{ venue.price }}
                  </span>
                </div>
              </div>
            </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-if="filteredVenues.length === 0" class="text-center py-12">
            <p class="text-gray-500 text-lg">No venues found matching your criteria</p>
            <button
              @click="clearFilters"
              class="mt-4 px-4 py-2 text-emerald-600 hover:text-emerald-700 font-medium"
            >
              Clear filters
            </button>
          </div>
        </div>
      </div>

      <!-- Map (Right Side) -->
      <div :class="['bg-gray-200', showMap ? 'block w-full md:w-1/2 lg:w-3/5' : 'hidden md:block w-full md:w-1/2 lg:w-3/5']">
        <div id="map" class="w-full h-full"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Using custom div icons for markers (no need for default icon setup)

const router = useRouter()
const { user } = useAuth()

const searchQuery = ref('')
const selectedCategories = ref([])
const selectedVenue = ref(null)
const showMap = ref(true)
const map = ref(null)
const markers = ref([])

// Check if venue should be blurred (for non-logged-in users, blur venues after first 3)
const isBlurred = (venue, index) => {
  if (user.value) return false // Logged-in users see everything
  return index >= 3 // First 3 venues are free, rest are blurred
}

// Get visible venues for map markers (only show first 3 for non-logged-in users)
const visibleVenues = computed(() => {
  if (user.value) return filteredVenues.value
  return filteredVenues.value.slice(0, 3)
})

const getCategoryColor = (category) => {
  const categoryMap = {
    'Restaurants': '#f59e0b',
    'Pubs & Bars': '#10b981',
    'Groomers': '#ec4899',
    'Experiences': '#8b5cf6',
    'Coffee Houses': '#d97706',
    'Parks': '#84cc16'
  }
  return categoryMap[category] || '#84cc16'
}

// Sample venues data (replace with Supabase data later)
const venues = ref([
  {
    id: 1,
    name: 'The Dog & Duck',
    category: 'Pubs & Bars',
    description: 'A cozy traditional pub welcoming dogs with water bowls and treats.',
    address: '123 High Street, London',
    rating: 4.5,
    price: '££',
    lat: 51.5074,
    lng: -0.1278
  },
  {
    id: 2,
    name: 'Pawsome Cafe',
    category: 'Restaurants',
    description: 'Dog-friendly cafe with a dedicated dog menu and outdoor seating.',
    address: '456 Park Lane, London',
    rating: 4.8,
    price: '£££',
    lat: 51.5155,
    lng: -0.1416
  },
  {
    id: 3,
    name: 'Bark & Groom',
    category: 'Groomers',
    description: 'Professional grooming salon with experienced staff.',
    address: '789 Oxford Street, London',
    rating: 4.7,
    price: '££',
    lat: 51.5154,
    lng: -0.1412
  },
  {
    id: 4,
    name: 'Dog Park Adventure',
    category: 'Experiences',
    description: 'Guided dog walking tours through beautiful parks.',
    address: '321 Green Park, London',
    rating: 4.9,
    price: '£££',
    lat: 51.5045,
    lng: -0.1376
  },
  {
    id: 5,
    name: 'Puppy Latte',
    category: 'Coffee Houses',
    description: 'Specialty coffee shop with dog treats and outdoor area.',
    address: '654 Regent Street, London',
    rating: 4.6,
    price: '£',
    lat: 51.5098,
    lng: -0.1396
  }
])

const categories = ref([
  { id: 'all', name: 'All', icon: '🐾' },
  { id: 'Restaurants', name: 'Restaurants', icon: '🍽️' },
  { id: 'Pubs & Bars', name: 'Pubs & Bars', icon: '🍺' },
  { id: 'Groomers', name: 'Groomers', icon: '✂️' },
  { id: 'Experiences', name: 'Experiences', icon: '🎯' },
  { id: 'Coffee Houses', name: 'Coffee', icon: '☕' }
])

const filteredVenues = computed(() => {
  let filtered = venues.value

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(venue =>
      venue.name.toLowerCase().includes(query) ||
      venue.description.toLowerCase().includes(query) ||
      venue.address.toLowerCase().includes(query)
    )
  }

  // Filter by categories
  if (selectedCategories.value.length > 0 && !selectedCategories.value.includes('all')) {
    filtered = filtered.filter(venue =>
      selectedCategories.value.includes(venue.category)
    )
  }

  return filtered
})

const toggleCategory = (categoryId) => {
  if (categoryId === 'all') {
    selectedCategories.value = ['all']
  } else {
    const index = selectedCategories.value.indexOf(categoryId)
    if (index > -1) {
      selectedCategories.value.splice(index, 1)
    } else {
      selectedCategories.value.push(categoryId)
      // Remove 'all' if a specific category is selected
      const allIndex = selectedCategories.value.indexOf('all')
      if (allIndex > -1) {
        selectedCategories.value.splice(allIndex, 1)
      }
    }
  }
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedCategories.value = []
}

const selectVenue = (venue) => {
  selectedVenue.value = venue
  if (map.value) {
    map.value.setView([venue.lat, venue.lng], 15)
    // Open popup for selected venue marker
    const marker = markers.value.find(m => {
      const position = m.getLatLng()
      return position.lat === venue.lat && position.lng === venue.lng
    })
    if (marker) {
      marker.openPopup()
    }
  }
}

const getCategoryIcon = (category) => {
  const categoryMap = {
    'Restaurants': '🍽️',
    'Pubs & Bars': '🍺',
    'Groomers': '✂️',
    'Experiences': '🎯',
    'Coffee Houses': '☕'
  }
  return categoryMap[category] || '🐾'
}

const getCategoryGradient = (category) => {
  const gradientMap = {
    'Restaurants': 'from-amber-400 to-orange-500',
    'Pubs & Bars': 'from-emerald-400 to-teal-500',
    'Groomers': 'from-pink-400 to-rose-500',
    'Experiences': 'from-purple-400 to-indigo-500',
    'Coffee Houses': 'from-amber-300 to-yellow-400'
  }
  return gradientMap[category] || 'from-gray-400 to-gray-500'
}

// Initialize Leaflet Map
const initMap = async () => {
  await nextTick() // Wait for DOM to be ready
  
  // Default to London center
  const defaultCenter = [51.5074, -0.1278]
  
  map.value = L.map('map').setView(defaultCenter, 12)

  // Add OpenStreetMap tiles
  L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
  attribution: '© Stadia Maps © OpenMapTiles © OpenStreetMap contributors',
  maxZoom: 20,
}).addTo(map.value)

  // Add markers for all venues
  updateMarkers()
}

const updateMarkers = () => {
  // Clear existing markers
  markers.value.forEach(marker => map.value.removeLayer(marker))
  markers.value = []

  if (!map.value) return

  // Add markers only for visible venues (first 3 for non-logged-in users)
  visibleVenues.value.forEach(venue => {
    // Create custom icon with emoji
    const customIcon = L.divIcon({
      className: 'custom-marker',
      html: `<div style="
        background-color: ${getCategoryColor(venue.category)};
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 3px solid white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        cursor: pointer;
      ">${getCategoryIcon(venue.category)}</div>`,
      iconSize: [40, 40],
      iconAnchor: [20, 20]
    })

    const marker = L.marker([venue.lat, venue.lng], { icon: customIcon })
      .addTo(map.value)
      .bindPopup(`<b>${venue.name}</b><br>${venue.address}<br><span class="text-yellow-500">⭐ ${venue.rating}</span>`)

    marker.on('click', () => {
      selectVenue(venue)
    })

    markers.value.push(marker)
  })
}

// Watch for visible venues changes and update markers
watch(visibleVenues, () => {
  updateMarkers()
}, { deep: true })

// Also watch user auth state to update markers when user logs in
watch(() => user.value, () => {
  updateMarkers()
})

onMounted(() => {
  initMap()
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Leaflet map container */
#map {
  width: 100%;
  height: 100%;
  z-index: 1;
}

/* Custom marker styles */
:deep(.custom-marker) {
  background: transparent !important;
  border: none !important;
}

/* Leaflet popup styling */
:deep(.leaflet-popup-content-wrapper) {
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

:deep(.leaflet-popup-content) {
  margin: 12px;
  font-size: 14px;
}
</style>
