<template>
  <div class="h-[calc(100vh-4rem)] flex flex-col">
    <!-- Search and Filters Bar -->
    <div class="bg-white border-b shadow-sm p-4">
      <div class="container mx-auto">
        <div class="flex flex-col md:flex-row gap-4 items-center">
          <div class="flex-1 w-full md:max-w-md">
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search venues..."
                class="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
              <svg
                class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          <div class="flex flex-wrap gap-2">
            <button
              v-for="category in categories"
              :key="category.id"
              @click="toggleCategory(category.id)"
              :class="[
                'px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2',
                selectedCategories.includes(category.id)
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
              ]"
            >
              <!-- This is the fix: use the actual emoji from DB -->
              <span class="text-lg">{{ getLiveIcon(category.id) }}</span>
              <span>{{ category.name }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex overflow-hidden">
      <!-- Venues List -->
      <div
        :class="[
          'overflow-y-auto bg-gray-50',
          showMap ? 'hidden md:block w-full md:w-1/2 lg:w-2/5' : 'block w-full',
        ]"
      >
        <div class="p-4 space-y-4">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h2
                class="text-2xl font-bold"
                style="font-family: var(--font-display)"
              >
                {{ filteredVenues.length }} Venues Found
              </h2>
              <p v-if="!user" class="text-sm text-gray-600 mt-1">
                Showing first 3 venues.
                <router-link
                  to="/auth/signup"
                  class="text-emerald-600 hover:text-emerald-700 font-medium"
                  >Sign up</router-link
                >
                to view all.
              </p>
            </div>
            <button
              @click="showMap = !showMap"
              class="md:hidden px-4 py-2 bg-emerald-600 text-white rounded-lg"
            >
              {{ showMap ? "Hide Map" : "Show Map" }}
            </button>
          </div>

          <!-- Venue Cards -->
          <div
            v-for="(venue, index) in filteredVenues"
            :key="venue.id"
            @click="!isBlurred(venue, index) && goToVenueDetails(venue)"
            :class="[
              'bg-white rounded-xl shadow-md p-6 transition-all duration-200 relative',
              selectedVenue?.id === venue.id ? 'ring-2 ring-emerald-500' : '',
              isBlurred(venue, index)
                ? 'cursor-default'
                : 'cursor-pointer hover:shadow-xl hover:scale-[1.02]',
            ]"
          >
            <!-- Blur Overlay -->
            <div
              v-if="isBlurred(venue, index)"
              class="absolute inset-0 bg-white bg-opacity-80 backdrop-blur-md rounded-xl z-10 flex items-center justify-center"
            >
              <div class="text-center">
                <div class="text-4xl mb-4">Lock</div>
                <h3 class="text-xl font-bold mb-2">Sign Up to See More</h3>
                <router-link
                  to="/auth/signup"
                  class="px-6 py-3 bg-emerald-600 text-white rounded-lg font-bold"
                >
                  Sign Up Free
                </router-link>
              </div>
            </div>

            <div :class="{ 'filter blur-sm': isBlurred(venue, index) }">
              <div class="flex gap-4">
                <!-- Gradient Icon -->
                <div
                  class="w-32 h-32 rounded-lg overflow-hidden bg-gradient-to-br flex items-center justify-center text-5xl shadow-lg"
                  :class="getCategoryGradient(venue)"
                >
                  {{ venue.categories?.icon || "Paw" }}
                </div>

                <!-- Info -->
                <div class="flex-1">
                  <h3
                    class="text-xl font-bold truncate"
                    style="font-family: var(--font-display)"
                  >
                    {{ venue.name }}
                  </h3>
                  <p class="text-gray-600 text-sm mb-2 line-clamp-2">
                    {{ venue.description }}
                  </p>
                  <p class="text-gray-500 text-sm flex items-center">
                    <svg
                      class="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {{ venue.address }}
                  </p>
                  <div class="flex items-center gap-3 mt-3">
                    <span
                      class="px-3 py-1 rounded-full text-xs font-bold text-white"
                      :style="{
                        backgroundColor: venue.categories?.color || '#10b981',
                      }"
                    >
                      {{ venue.categories?.name || "Unknown" }}
                    </span>
                    <span
                      v-if="venue.price"
                      class="text-gray-600 font-medium"
                      >{{ venue.price }}</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Map -->
      <div
        :class="[
          'bg-gray-200',
          showMap ? 'block w-full md:w-1/2 lg:w-3/5' : 'hidden md:block',
        ]"
      >
        <div id="map" class="w-full h-full"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "../composables/useAuth";
import L from "leaflet";
import { supabase } from "../lib/supabase";
import "leaflet/dist/leaflet.css";

const router = useRouter();
const { user } = useAuth();

const venues = ref([]);
const searchQuery = ref("");
const selectedCategories = ref([]);
const selectedVenue = ref(null);
const showMap = ref(true);
const map = ref(null);
const markers = ref([]);

// Fetch venues
async function getVenues() {
  const { data, error } = await supabase.from("venues").select(`
      id, name, description, address, price, latitude, longitude,
      categories!venues_category_id_fkey (name, icon, color)
    `);

  if (error) {
    console.error("Error loading venues:", error);
    return;
  }

  venues.value = data || [];
}

// Returns the live emoji from your Supabase categories table
const getLiveIcon = (categoryName) => {
  if (categoryName === 'all') return ''
  const found = venues.value
    .map(v => v.categories)
    .find(c => c?.name === categoryName)
  return found?.icon || ''
}

// Category filter buttons
const categories = [
  { id: "all", name: "All", icon: "Paw" },
  { id: "Pubs & Bars", name: "Pubs & Bars", icon: "Beer" },
  { id: "Coffee Houses", name: "Cafés", icon: "Coffee" },
  { id: "Parks", name: "Parks", icon: "Park" },
];

// Computed
const filteredVenues = computed(() => {
  let list = venues.value;

  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    list = list.filter(
      (v) =>
        v.name.toLowerCase().includes(q) ||
        v.description.toLowerCase().includes(q) ||
        v.address.toLowerCase().includes(q)
    );
  }

  if (
    selectedCategories.value.length > 0 &&
    !selectedCategories.value.includes("all")
  ) {
    list = list.filter((v) =>
      selectedCategories.value.includes(v.categories?.name)
    );
  }

  return list;
});

const visibleVenues = computed(() => {
  return user.value ? filteredVenues.value : filteredVenues.value.slice(0, 3);
});

const isBlurred = (venue, index) => !user.value && index >= 3;

const goToVenueDetails = (venue) => {
  router.push(`/venues/${venue.id}`);
};

// Category styling
const getCategoryGradient = (venue) => {
  const map = {
    "Pubs & Bars": "from-emerald-400 to-teal-600",
    "Coffee Houses": "from-amber-400 to-orange-500",
    Parks: "from-green-400 to-emerald-600",
  };
  return map[venue.categories?.name] || "from-gray-400 to-gray-600";
};

// Map
const initMap = async () => {
  await nextTick();
  map.value = L.map("map").setView([51.5074, -0.1278], 12);
  L.tileLayer(
    "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png",
    {
      attribution: "© Stadia Maps",
      maxZoom: 20,
    }
  ).addTo(map.value);
  updateMarkers();
};

const updateMarkers = () => {
  markers.value.forEach((m) => m.remove());
  markers.value = [];

  visibleVenues.value.forEach((venue) => {
    const iconHtml = `<div style="
      background: ${venue.categories?.color || "#10b981"};
      width: 44px; height: 44px;
      border-radius: 50%;
      border: 4px solid white;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      display: flex; align-items: center; justify-content: center;
      font-size: 24px;
    ">${venue.categories?.icon || "Paw"}</div>`;

    const icon = L.divIcon({
      html: iconHtml,
      className: "",
      iconSize: [44, 44],
      iconAnchor: [22, 44],
    });

    const marker = L.marker([venue.latitude, venue.longitude], { icon })
      .addTo(map.value)
      .bindPopup(`<b class="text-lg">${venue.name}</b><br>${venue.address}`);

    marker.on("click", () => {
      selectedVenue.value = venue;
      map.value.setView([venue.latitude, venue.longitude], 16);
    });

    markers.value.push(marker);
  });
};

watch(visibleVenues, updateMarkers, { deep: true });
watch(() => user.value, updateMarkers);

const toggleCategory = (id) => {
  if (id === "all") {
    selectedCategories.value = ["all"];
  } else {
    selectedCategories.value = selectedCategories.value.includes(id)
      ? selectedCategories.value.filter((c) => c !== id)
      : [...selectedCategories.value.filter((c) => c !== "all"), id];
  }
};

onMounted(() => {
  getVenues();
  initMap();
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
#map {
  height: 100%;
  width: 100%;
}
</style>
