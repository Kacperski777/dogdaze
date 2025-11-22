<template>
  <div class="max-w-4xl mx-auto animate-fade-in">
    <div v-if="loading && !profile" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      <p class="text-gray-600 mt-4">Loading profile...</p>
    </div>

    <div v-else-if="error" class="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg mb-4 animate-slide-in">
      <p class="font-medium">{{ error }}</p>
    </div>

    <div v-else class="space-y-6">
      <!-- Profile Header -->
      <div class="bg-white rounded-2xl shadow-lg p-6 lg:p-8 animate-scale-in">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h1 class="text-3xl lg:text-4xl font-bold text-gray-800 mb-2" style="font-family: var(--font-display);">
              My Profile
            </h1>
            <p class="text-gray-500">Manage your account information</p>
          </div>
          <button
            @click="editing = !editing"
            class="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg font-medium"
          >
            {{ editing ? 'Cancel' : 'Edit Profile' }}
          </button>
        </div>

        <div v-if="!editing" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl">
              <label class="block text-sm font-medium text-gray-600 mb-2">Full Name</label>
              <p class="text-gray-900 text-lg font-semibold">{{ profile?.full_name || user?.user_metadata?.full_name || 'Not set' }}</p>
            </div>
            <div class="p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl">
              <label class="block text-sm font-medium text-gray-600 mb-2">Email</label>
              <p class="text-gray-900 text-lg font-semibold">{{ user?.email }}</p>
            </div>
          </div>
          <div v-if="profile?.phone" class="p-4 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl">
            <label class="block text-sm font-medium text-gray-600 mb-2">Phone</label>
            <p class="text-gray-900 text-lg font-semibold">{{ profile.phone }}</p>
          </div>
          <div v-if="profile?.bio" class="p-4 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl">
            <label class="block text-sm font-medium text-gray-600 mb-2">Bio</label>
            <p class="text-gray-900">{{ profile.bio }}</p>
          </div>
        </div>

        <!-- Edit Form -->
        <form v-else @submit.prevent="handleUpdateProfile" class="space-y-4">
          <div>
            <FormKit 
              type="text" 
              label="Full Name" 
              v-model="formData.full_name"
              validation="required"
            />
          </div>
          <div>
            <FormKit 
              type="email" 
              label="Email" 
              v-model="formData.email"
              validation="required|email"
              disabled
            />
            <p class="text-xs text-gray-500 mt-1">Email cannot be changed</p>
          </div>
          <div>
            <FormKit 
              type="tel" 
              label="Phone" 
              v-model="formData.phone"
            />
          </div>
          <div>
            <FormKit 
              type="textarea" 
              label="Bio" 
              v-model="formData.bio"
              rows="4"
            />
          </div>
          <div class="flex gap-4">
            <button
              type="submit"
              :disabled="saving"
              class="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg disabled:opacity-50 disabled:transform-none font-medium"
            >
              <span v-if="saving" class="flex items-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </span>
              <span v-else>Save Changes</span>
            </button>
            <button
              type="button"
              @click="editing = false"
              class="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-200 font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      <!-- Account Info -->
      <div class="bg-white rounded-2xl shadow-lg p-6 lg:p-8 animate-scale-in" style="animation-delay: 0.1s;">
        <h2 class="text-2xl font-bold text-gray-800 mb-6" style="font-family: var(--font-display);">Account Information</h2>
        <div class="space-y-3">
          <div class="flex justify-between items-center">
            <span class="text-gray-600">User ID</span>
            <span class="text-gray-900 font-mono text-sm">{{ user?.id }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-600">Account Created</span>
            <span class="text-gray-900">{{ formatDate(user?.created_at) }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-600">Last Sign In</span>
            <span class="text-gray-900">{{ formatDate(user?.last_sign_in_at) }}</span>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="bg-white rounded-2xl shadow-lg p-6 lg:p-8 animate-scale-in" style="animation-delay: 0.2s;">
        <h2 class="text-2xl font-bold text-gray-800 mb-6" style="font-family: var(--font-display);">Actions</h2>
        <button
          @click="handleSignOut"
          class="px-6 py-3 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-lg hover:from-red-600 hover:to-rose-600 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg font-medium"
        >
          Sign Out
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import anime from 'animejs/lib/anime.es.js'

const router = useRouter()
const { user, signOut, getUserProfile, updateUserProfile } = useAuth()

const profile = ref(null)
const loading = ref(true)
const error = ref('')
const editing = ref(false)
const saving = ref(false)

const formData = ref({
  full_name: '',
  phone: '',
  bio: ''
})

const loadProfile = async () => {
  loading.value = true
  error.value = ''
  
  try {
    const profileData = await getUserProfile()
    profile.value = profileData
    
    // Initialize form data
    if (profileData) {
      formData.value = {
        full_name: profileData.full_name || user.value?.user_metadata?.full_name || '',
        phone: profileData.phone || '',
        bio: profileData.bio || ''
      }
    } else {
      // If no profile exists, use user metadata
      formData.value = {
        full_name: user.value?.user_metadata?.full_name || '',
        phone: '',
        bio: ''
      }
    }
  } catch (err) {
    error.value = 'Failed to load profile'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const handleUpdateProfile = async () => {
  saving.value = true
  error.value = ''
  
  try {
    const { data, error: updateError } = await updateUserProfile(formData.value)
    
    if (updateError) {
      error.value = updateError
    } else {
      profile.value = data
      editing.value = false
      // Show success message (you could add a toast notification here)
    }
  } catch (err) {
    error.value = 'Failed to update profile'
    console.error(err)
  } finally {
    saving.value = false
  }
}

const handleSignOut = async () => {
  await signOut()
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

onMounted(() => {
  loadProfile()
  
  // Animate profile sections
  anime({
    targets: '.animate-scale-in',
    scale: [0.95, 1],
    opacity: [0, 1],
    duration: 600,
    delay: anime.stagger(100),
    easing: 'easeOutExpo'
  })
})
</script>

