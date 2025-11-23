<template>
  <div class="min-h-screen bg-gray-50">

    <!-- Loading / Error -->
    <div v-if="loading" class="flex items-center justify-center h-screen text-2xl text-gray-600">
      Loading venue...
    </div>
    <div v-else-if="error" class="flex items-center justify-center h-screen text-red-600 text-xl">
      {{ error }}
    </div>

    <!-- Real Content -->
    <div v-else-if="venue">
      <!-- Hero -->
       
      <div 
        class="relative h-[60vh] md:h-[70vh]"
        :style="{ background: heroGradient(venue.categories?.color) }"
      >
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="text-9xl md:text-[12rem] opacity-90">{{ venue.categories?.icon || 'Paw' }}</div>
        </div>
        <!-- Dots if you add photos later -->
        <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          <div v-for="n in 3" :key="n" class="w-2 h-2 bg-white/50 rounded-full"></div>
        </div>
      </div>

      <div class="container mx-auto px-4 -mt-32 relative z-10 pb-20">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <!-- Left Column -->
          <div class="lg:col-span-2 space-y-6">

            <!-- Title + Rating + Badges -->
            <div class="bg-white rounded-2xl shadow-xl p-8">
              <h1 class="text-4xl md:text-5xl font-bold mb-3" style="font-family: var(--font-display)">
                {{ venue.name }}
              </h1>
              <div class="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
                <span class="flex items-center gap-1">
                  <span class="text-yellow-500 text-xl">4.5</span>
                  <span class="text-sm">(127 reviews)</span>
                </span>
                <span class="flex items-center gap-1 text-sm">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  {{ venue.address }}
                </span>
              </div>

              <!-- Quick Badges - Pastel style -->
              <div class="flex flex-wrap gap-3 mb-6">
                <span v-for="badge in venue.quick_badges" :key="badge"
                      class="px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2"
                      :class="badgeClasses(badge)">
                  {{ badgeEmoji(badge) }} {{ badgeText(badge) }}
                
                </span>
              </div>

              <!-- Action Buttons -->
              <div class="flex flex-wrap gap-4">
                <button @click="getDirections"
                        class="px-8 py-4 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition flex items-center gap-3">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4"/>
                  </svg>
                  Directions
                </button>
                <button @click="callVenue"
                        class="px-8 py-4 border-2 border-gray-300 rounded-lg font-semibold hover:border-emerald-600 transition flex items-center gap-3">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                  Call
                </button>
                <button @click="saveToList"
                        class="px-8 py-4 border-2 border-gray-300 rounded-lg font-semibold hover:border-emerald-600 transition flex items-center gap-3">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
                  </svg>
                  Save to List
                </button>
              </div>
            </div>

            <!-- Tabs -->
            <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div class="flex border-b">
                <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id"
                        class="flex-1 py-5 text-lg font-medium transition"
                        :class="activeTab === tab.id ? 'text-emerald-600 border-b-4 border-emerald-600' : 'text-gray-500'">
                  {{ tab.label }}
                </button>
              </div>

              <div class="p-8">
                <!-- About -->
                <div v-if="activeTab === 'about'">
                  <h3 class="text-3xl font-bold mb-6" style="font-family: var(--font-display)">About this place</h3>
                  <p class="text-gray-700 leading-relaxed mb-10 whitespace-pre-line">{{ venue.description }}</p>

                  <div class="grid md:grid-cols-2 gap-10">
                    <div>
                      <h4 class="font-bold text-xl mb-4">Amenities</h4>
                      <ul class="space-y-3">
                        <li v-for="a in venue.amenities" :key="a" class="flex items-center gap-3 text-gray-700">
                          <svg class="w-6 h-6 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                          </svg>
                          {{ a.replace(/_/g, ' ') }}
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 class="font-bold text-xl mb-4">Details</h4>
                      <div class="space-y-4 text-gray-700">
                        <div class="flex justify-between"><span>Category:</span>
                          <span class="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full font-medium">
                            {{ venue.categories?.name }}
                          </span>
                        </div>
                        <div class="flex justify-between"><span>Price Range:</span> <strong>{{ venue.price || '££' }}</strong></div>
                        <div class="flex justify-between"><span>Opening Hours:</span> <strong>Mon-Sun: 11:00 - 23:00</strong></div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Dog Rules -->
                <div v-if="activeTab === 'dog-rules'">
                  <h3 class="text-3xl font-bold mb-6" style="font-family: var(--font-display)">Dog Policy</h3>
                  <div class="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
                    <p class="text-blue-900 font-medium text-lg">
                      {{ venue.dog_policy_summary || 'Dogs are welcome throughout the pub, including the bar area and outdoor seating. We provide complimentary water bowls and treats. Well-behaved dogs are always welcome!' }}
                    </p>
                  </div>

                  <div class="grid md:grid-cols-2 gap-10">
                    <div>
                      <h4 class="font-bold text-xl mb-4">Dog-Friendly Features</h4>
                      <ul class="space-y-4">
                        <li class="flex items-start gap-4">
                          <span class="text-3xl">Water</span>
                          <div>
                            <p class="font-medium">Water Bowls</p>
                            <p class="text-sm text-gray-600">Fresh water available for your dog</p>
                          </div>
                        </li>
                        <li class="flex items-start gap-4">
                          <span class="text-3xl">Treats</span>
                          <div>
                            <p class="font-medium">Dog Treats</p>
                            <p class="text-sm text-gray-600">Complimentary treats for well-behaved dogs</p>
                          </div>
                        </li>
                        <li class="flex items-start gap-4">
                          <span class="text-3xl">Garden</span>
                          <div>
                            <p class="font-medium">Outdoor Area</p>
                            <p class="text-sm text-gray-600">Spacious outdoor seating for dogs</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 class="font-bold text-xl mb-4">Rules & Guidelines</h4>
                      <ul class="space-y-3 text-gray-700">
                        <li class="flex items-center gap-3"><svg class="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg> Dogs must be kept on a leash</li>
                        <li class="flex items-center gap-3"><svg class="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg> Please clean up after your dog</li>
                        <li class="flex items-center gap-3"><svg class="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg> Maximum 2 dogs per table</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Sidebar Card -->
          <div class="lg:col-span-1">
            <div class="bg-white rounded-2xl shadow-xl p-8 sticky top-24">
              <div class="text-5xl font-black mb-2">{{ venue.price || '££' }}</div>
              <div class="text-gray-600 mb-8">per visit</div>
              <div class="space-y-6 text-lg border-t pt-6">
                <div class="flex justify-between"><span>Rating:</span> <strong>4.5 / 5</strong></div>
                <div class="flex justify-between"><span>Reviews:</span> <strong>127</strong></div>
                <div class="flex justify-between items-center">
                  <span>Category:</span>
                  <span class="px-5 py-2 bg-emerald-100 text-emerald-700 rounded-full font-medium">
                    {{ venue.categories?.name }}
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '../lib/supabase'

const route = useRoute()
const venue = ref(null)
const loading = ref(true)
const error = ref(null)
const activeTab = ref('about')

const tabs = [
  { id: 'about', label: 'About' },
  { id: 'dog-rules', label: 'Dog Rules' },
  { id: 'reviews', label: 'Reviews' }
]

const heroGradient = (color) => {
  // Default to emerald green if no color provided
  const baseColor = color || '#10b981'
  // Create a darker shade for the gradient end
  const darkerColor = color ? adjustColorBrightness(color, -20) : '#059669'
  return `linear-gradient(to bottom, ${baseColor}, ${darkerColor})`
}

// Helper function to adjust color brightness
const adjustColorBrightness = (hex, percent) => {
  // Remove # if present
  hex = hex.replace('#', '')
  
  // Convert to RGB
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)
  
  // Adjust brightness
  const newR = Math.max(0, Math.min(255, r + percent))
  const newG = Math.max(0, Math.min(255, g + percent))
  const newB = Math.max(0, Math.min(255, b + percent))
  
  // Convert back to hex
  return `#${[newR, newG, newB].map(x => {
    const hex = x.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }).join('')}`
}

const badgeClasses = (b) => ({
  'dogs_indoor': 'bg-blue-100 text-blue-700',
  'outdoor_seating': 'bg-amber-100 text-amber-700',
  'water_bowl': 'bg-cyan-100 text-cyan-700',
  'dog_treats': 'bg-pink-100 text-pink-700',
}[b] || 'bg-gray-100 text-gray-700')

const badgeEmoji = (b) => ({ dogs_indoor: 'Indoor', outdoor_seating: 'Garden', water_bowl: 'Water', dog_treats: 'Treats' }[b] || 'Paw')
const badgeText = (b) => b.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())

const getDirections = () => window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(venue.value.address)}`, '_blank')
const callVenue = () => venue.value.phone && (window.location.href = `tel:${venue.value.phone}`)
const saveToList = () => alert('Saved!')

onMounted(async () => {
  try {
    const { data, error: err } = await supabase
      .from('venues')
      .select(`
       * ,
        categories!venues_category_id_fkey (name, icon, color)
      `)
      .eq('id', route.params.id)
      .single()

    if (err) throw err
    venue.value = data
  } catch (e) {
    error.value = 'Venue not found or access denied'
    console.error(e)
  } finally {
    loading.value = false
  }
})
</script>