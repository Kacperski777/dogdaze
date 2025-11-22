<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Image Carousel -->
    <div class="relative h-[60vh] md:h-[70vh] overflow-hidden bg-gray-200">
      <div class="relative w-full h-full">
        <!-- Images -->
        <div
          v-for="(image, index) in venue.images"
          :key="index"
          :class="[
            'absolute inset-0 transition-opacity duration-500',
            currentImageIndex === index ? 'opacity-100 z-10' : 'opacity-0 z-0',
          ]"
        >
          <div
            class="w-full h-full bg-gradient-to-br"
            :class="getCategoryGradient(venue.category)"
          >
            <div
              class="w-full h-full flex items-center justify-center text-8xl"
            >
              {{ getCategoryIcon(venue.category) }}
            </div>
          </div>
        </div>

        <!-- Navigation Arrows -->
        <button
          v-if="venue.images.length > 1"
          @click="previousImage"
          class="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          v-if="venue.images.length > 1"
          @click="nextImage"
          class="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        <!-- Image Indicators -->
        <div
          v-if="venue.images.length > 1"
          class="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex gap-2"
        >
          <button
            v-for="(image, index) in venue.images"
            :key="index"
            @click="currentImageIndex = index"
            :class="[
              'w-2 h-2 rounded-full transition-all',
              currentImageIndex === index
                ? 'bg-white w-8'
                : 'bg-white bg-opacity-50',
            ]"
          />
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left Column - Main Content -->
        <div class="lg:col-span-2">
          <!-- Title Section -->
          <div class="mb-6">
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1">
                <h1
                  class="text-3xl md:text-4xl font-bold text-gray-900 mb-2"
                  style="font-family: var(--font-display)"
                >
                  {{ venue.name }}
                </h1>
                <div class="flex items-center gap-4 flex-wrap">
                  <div class="flex items-center gap-1">
                    <svg
                      class="w-5 h-5 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                    <span class="font-semibold">{{ venue.rating }}</span>
                    <span class="text-gray-500"
                      >({{ venue.reviewCount }} reviews)</span
                    >
                  </div>
                  <div class="flex items-center gap-1 text-gray-600">
                    <svg
                      class="w-5 h-5"
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
                    <span>{{ venue.location }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Quick Badges -->
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                v-if="venue.dogFriendly"
                class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium flex items-center gap-1"
              >
                <span>🐕</span> Dog Friendly
              </span>
              <span
                v-if="venue.outdoorSeating"
                class="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium"
              >
                🌳 Outdoor Seating
              </span>
              <span
                v-if="venue.waterBowls"
                class="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium"
              >
                💧 Water Bowls
              </span>
              <span
                v-if="venue.dogTreats"
                class="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-medium"
              >
                🦴 Dog Treats
              </span>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-wrap gap-3 mb-8 pb-8 border-b">
            <button
              @click="getDirections"
              class="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all shadow-md hover:shadow-lg"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
              Directions
            </button>
            <button
              @click="callVenue"
              class="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:border-emerald-500 hover:text-emerald-600 transition-all"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              Call
            </button>
            <button
              @click="saveToList"
              class="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:border-emerald-500 hover:text-emerald-600 transition-all"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
              Save to List
            </button>
          </div>

          <!-- Tabs -->
          <div class="mb-6">
            <div class="flex border-b border-gray-200">
              <button
                v-for="tab in tabs"
                :key="tab.id"
                @click="activeTab = tab.id"
                :class="[
                  'px-6 py-3 font-medium text-sm transition-colors border-b-2',
                  activeTab === tab.id
                    ? 'border-emerald-600 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                ]"
              >
                {{ tab.label }}
              </button>
            </div>
          </div>

          <!-- Tab Content -->
          <div class="min-h-[400px]">
            <!-- About Tab -->
            <div v-if="activeTab === 'about'" class="space-y-6">
              <div>
                <h3
                  class="text-2xl font-bold mb-4"
                  style="font-family: var(--font-display)"
                >
                  About this place
                </h3>
                <p class="text-gray-700 leading-relaxed whitespace-pre-line">
                  {{ venue.description }}
                </p>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 class="font-semibold mb-2">Amenities</h4>
                  <ul class="space-y-2 text-gray-700">
                    <li
                      v-for="amenity in venue.amenities"
                      :key="amenity"
                      class="flex items-center gap-2"
                    >
                      <svg
                        class="w-5 h-5 text-emerald-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      {{ amenity }}
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 class="font-semibold mb-2">Details</h4>
                  <ul class="space-y-2 text-gray-700">
                    <li class="flex justify-between">
                      <span class="text-gray-600">Category:</span>
                      <span
                        class="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium"
                      >
                        {{ venue.category }}
                      </span>
                    </li>
                    <li class="flex justify-between">
                      <span class="text-gray-600">Price Range:</span>
                      <span class="font-medium">{{ venue.price }}</span>
                    </li>
                    <li class="flex justify-between">
                      <span class="text-gray-600">Opening Hours:</span>
                      <span class="font-medium">{{ venue.openingHours }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Dog Rules Tab -->
            <div v-if="activeTab === 'dog-rules'" class="space-y-6">
              <div>
                <h3
                  class="text-2xl font-bold mb-4"
                  style="font-family: var(--font-display)"
                >
                  Dog Policy
                </h3>
                <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                  <p class="text-blue-800 font-medium">{{ venue.dogPolicy }}</p>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 class="font-semibold mb-3">Dog-Friendly Features</h4>
                  <ul class="space-y-3">
                    <li
                      v-for="feature in venue.dogFeatures"
                      :key="feature"
                      class="flex items-start gap-3"
                    >
                      <span class="text-2xl">{{
                        getFeatureIcon(feature)
                      }}</span>
                      <div>
                        <p class="font-medium">{{ feature }}</p>
                        <p class="text-sm text-gray-600">
                          {{ getFeatureDescription(feature) }}
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 class="font-semibold mb-3">Rules & Guidelines</h4>
                  <ul class="space-y-2 text-gray-700">
                    <li
                      v-for="rule in venue.dogRules"
                      :key="rule"
                      class="flex items-start gap-2"
                    >
                      <svg
                        class="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <span>{{ rule }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Reviews Tab -->
            <div v-if="activeTab === 'reviews'" class="space-y-6">
              <div class="flex items-center justify-between mb-6">
                <h3
                  class="text-2xl font-bold"
                  style="font-family: var(--font-display)"
                >
                  Reviews ({{ venue.reviewCount }})
                </h3>
                <button
                  @click="showReviewForm = !showReviewForm"
                  class="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
                >
                  Write a Review
                </button>
              </div>

              <!-- Review Form -->
              <div
                v-if="showReviewForm"
                class="bg-white border-2 border-gray-200 rounded-xl p-6 mb-6"
              >
                <h4 class="text-xl font-bold mb-4">Share your experience</h4>
                <form @submit.prevent="submitReview" class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2"
                      >Rating</label
                    >
                    <div class="flex gap-2">
                      <button
                        v-for="star in 5"
                        :key="star"
                        type="button"
                        @click="newReview.rating = star"
                        class="text-3xl transition-colors"
                        :class="
                          star <= newReview.rating
                            ? 'text-yellow-500'
                            : 'text-gray-300'
                        "
                      >
                        ★
                      </button>
                    </div>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2"
                      >Review</label
                    >
                    <textarea
                      v-model="newReview.comment"
                      rows="4"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Tell others about your experience..."
                    ></textarea>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2"
                      >Photos (optional)</label
                    >
                    <div class="flex gap-2">
                      <button
                        type="button"
                        @click="triggerFileInput"
                        class="px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-emerald-500 transition text-gray-600"
                      >
                        + Add Photo
                      </button>
                      <input
                        ref="fileInput"
                        type="file"
                        accept="image/*"
                        multiple
                        @change="handleFileSelect"
                        class="hidden"
                      />
                    </div>
                    <div
                      v-if="newReview.photos.length > 0"
                      class="flex gap-2 mt-2"
                    >
                      <div
                        v-for="(photo, index) in newReview.photos"
                        :key="index"
                        class="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-200"
                      >
                        <img
                          :src="photo.preview"
                          class="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          @click="removePhoto(index)"
                          class="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="flex gap-3">
                    <button
                      type="submit"
                      class="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
                    >
                      Submit Review
                    </button>
                    <button
                      type="button"
                      @click="cancelReview"
                      class="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>

              <!-- Reviews List -->
              <div class="space-y-6">
                <div
                  v-for="review in displayedReviews"
                  :key="review.id"
                  class="bg-white rounded-xl p-6 shadow-sm"
                >
                  <div class="flex items-start gap-4 mb-4">
                    <div
                      class="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold"
                    >
                      {{ review.userName[0].toUpperCase() }}
                    </div>
                    <div class="flex-1">
                      <div class="flex items-center justify-between mb-1">
                        <h4 class="font-semibold">{{ review.userName }}</h4>
                        <span class="text-sm text-gray-500">{{
                          formatDate(review.date)
                        }}</span>
                      </div>
                      <div class="flex items-center gap-1 mb-2">
                        <div class="flex">
                          <span
                            v-for="star in 5"
                            :key="star"
                            class="text-yellow-500"
                            :class="star <= review.rating ? '' : 'opacity-30'"
                          >
                            ★
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p class="text-gray-700 mb-4">{{ review.comment }}</p>
                  <div
                    v-if="review.photos && review.photos.length > 0"
                    class="flex gap-2"
                  >
                    <img
                      v-for="(photo, index) in review.photos"
                      :key="index"
                      :src="photo"
                      class="w-24 h-24 object-cover rounded-lg"
                      @click="openImageModal(photo)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column - Booking/Info Card -->
        <div class="lg:col-span-1">
          <div
            class="sticky top-20 bg-white rounded-xl shadow-lg p-6 border border-gray-200"
          >
            <div class="mb-4">
              <div class="text-3xl font-bold mb-2">{{ venue.price }}</div>
              <div class="text-gray-600">per visit</div>
            </div>
            <div class="space-y-3 text-sm text-gray-600 border-t pt-4">
              <div class="flex justify-between">
                <span>Rating:</span>
                <span class="font-semibold text-gray-900"
                  >{{ venue.rating }} / 5</span
                >
              </div>
              <div class="flex justify-between">
                <span>Reviews:</span>
                <span class="font-semibold text-gray-900">{{
                  venue.reviewCount
                }}</span>
              </div>
              <div class="flex justify-between">
                <span>Category:</span>
                <span
                  class="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium"
                >
                  {{ venue.category }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Image Modal -->
    <div
      v-if="selectedImage"
      @click="selectedImage = null"
      class="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
    >
      <img
        :src="selectedImage"
        class="max-w-full max-h-full rounded-lg"
        @click.stop
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const currentImageIndex = ref(0);
const activeTab = ref("about");
const showReviewForm = ref(false);
const selectedImage = ref(null);
const fileInput = ref(null);

const tabs = [
  { id: "about", label: "About" },
  { id: "dog-rules", label: "Dog Rules" },
  { id: "reviews", label: "Reviews" },
];

const newReview = ref({
  rating: 5,
  comment: "",
  photos: [],
});

// Sample venue data (replace with API/Supabase data)
const venue = ref({
  id: 1,
  name: "The Dog & Duck",
  category: "Pubs & Bars",
  description: `A cozy traditional pub in the heart of London, The Dog & Duck has been welcoming dogs and their owners for over 50 years. Our friendly staff are always happy to provide water bowls and treats for your furry friends.

We offer a wide selection of craft beers, traditional ales, and delicious pub food. Our outdoor seating area is perfect for dogs to relax while you enjoy your meal. The pub has a warm, welcoming atmosphere that makes both humans and dogs feel at home.`,
  location: "123 High Street, London, SW1A 1AA",
  rating: 4.5,
  reviewCount: 127,
  price: "££",
  openingHours: "Mon-Sun: 11:00 - 23:00",
  dogFriendly: true,
  outdoorSeating: true,
  waterBowls: true,
  dogTreats: true,
  images: [1, 2, 3, 4, 5], // Placeholder for images
  amenities: [
    "WiFi",
    "Outdoor Seating",
    "Parking Available",
    "Wheelchair Accessible",
    "Live Music",
    "Dog Water Bowls",
  ],
  dogPolicy:
    "Dogs are welcome throughout the pub, including the bar area and outdoor seating. We provide complimentary water bowls and treats. Well-behaved dogs are always welcome!",
  dogFeatures: [
    "Water Bowls",
    "Dog Treats",
    "Outdoor Area",
    "Dog-Friendly Staff",
  ],
  dogRules: [
    "Dogs must be kept on a leash",
    "Please clean up after your dog",
    "Dogs should be well-behaved",
    "Maximum 2 dogs per table",
  ],
  reviews: [
    {
      id: 1,
      userName: "Sarah Johnson",
      rating: 5,
      date: new Date("2024-01-15"),
      comment:
        "Amazing place! My dog Max loved the treats and the staff were so friendly. Great atmosphere and delicious food.",
      photos: [],
    },
    {
      id: 2,
      userName: "Mike Thompson",
      rating: 4,
      date: new Date("2024-01-10"),
      comment:
        "Really dog-friendly pub with a nice outdoor area. The water bowls are a nice touch. Food was good too!",
      photos: [],
    },
    {
      id: 3,
      userName: "Emma Wilson",
      rating: 5,
      date: new Date("2024-01-05"),
      comment:
        "Perfect spot for a drink with your dog. The staff went above and beyond to make our dog feel welcome. Highly recommend!",
      photos: [],
    },
  ],
});

const displayedReviews = computed(() => {
  return [...venue.value.reviews].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
});

const nextImage = () => {
  currentImageIndex.value =
    (currentImageIndex.value + 1) % venue.value.images.length;
};

const previousImage = () => {
  currentImageIndex.value =
    currentImageIndex.value === 0
      ? venue.value.images.length - 1
      : currentImageIndex.value - 1;
};

const getCategoryIcon = (category) => {
  const categoryMap = {
    Restaurants: "🍽️",
    "Pubs & Bars": "🍺",
    Groomers: "✂️",
    Experiences: "🎯",
    "Coffee Houses": "☕",
  };
  return categoryMap[category] || "🐾";
};

const getCategoryGradient = (category) => {
  const gradientMap = {
    Restaurants: "from-amber-400 to-orange-500",
    "Pubs & Bars": "from-emerald-400 to-teal-500",
    Groomers: "from-pink-400 to-rose-500",
    Experiences: "from-purple-400 to-indigo-500",
    "Coffee Houses": "from-amber-300 to-yellow-400",
  };
  return gradientMap[category] || "from-gray-400 to-gray-500";
};

const getFeatureIcon = (feature) => {
  const iconMap = {
    "Water Bowls": "💧",
    "Dog Treats": "🦴",
    "Outdoor Area": "🌳",
    "Dog-Friendly Staff": "👥",
  };
  return iconMap[feature] || "🐕";
};

const getFeatureDescription = (feature) => {
  const descMap = {
    "Water Bowls": "Fresh water available for your dog",
    "Dog Treats": "Complimentary treats for well-behaved dogs",
    "Outdoor Area": "Spacious outdoor seating for dogs",
    "Dog-Friendly Staff": "Our team loves dogs and will make them feel welcome",
  };
  return descMap[feature] || "";
};

const getDirections = () => {
  const address = encodeURIComponent(venue.value.location);
  window.open(
    `https://www.google.com/maps/search/?api=1&query=${address}`,
    "_blank"
  );
};

const callVenue = () => {
  window.location.href = `tel:+441234567890`;
};

const saveToList = () => {
  // TODO: Implement save to list functionality
  alert("Saved to your list!");
};

const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleFileSelect = (event) => {
  const files = Array.from(event.target.files);
  files.forEach((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      newReview.value.photos.push({
        file: file,
        preview: e.target.result,
      });
    };
    reader.readAsDataURL(file);
  });
};

const removePhoto = (index) => {
  newReview.value.photos.splice(index, 1);
};

const submitReview = () => {
  const review = {
    id: venue.value.reviews.length + 1,
    userName: "You", // Replace with actual user name
    rating: newReview.value.rating,
    date: new Date(),
    comment: newReview.value.comment,
    photos: newReview.value.photos.map((p) => p.preview),
  };

  venue.value.reviews.unshift(review);
  venue.value.reviewCount++;

  // Reset form
  cancelReview();

  // Switch to reviews tab
  activeTab.value = "reviews";
};

const cancelReview = () => {
  newReview.value = {
    rating: 5,
    comment: "",
    photos: [],
  };
  showReviewForm.value = false;
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const openImageModal = (image) => {
  selectedImage.value = image;
};

onMounted(() => {
  // Auto-advance carousel
  setInterval(() => {
    if (venue.value.images.length > 1) {
      nextImage();
    }
  }, 5000);
});
</script>

<style scoped>
/* Additional styles if needed */
</style>
