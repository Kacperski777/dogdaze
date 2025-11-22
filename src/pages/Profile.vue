<template>
  <div class="max-w-4xl mx-auto">
    <div v-if="loading && !profile" class="text-center py-12">
      <p class="text-gray-600">Loading profile...</p>
    </div>

    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {{ error }}
    </div>

    <div v-else class="space-y-6">
      <!-- Profile Header -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex items-center justify-between mb-6">
          <h1 class="text-3xl font-bold text-gray-800">My Profile</h1>
          <button
            @click="editing = !editing"
            class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            {{ editing ? 'Cancel' : 'Edit Profile' }}
          </button>
        </div>

        <div v-if="!editing" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <p class="text-gray-900">{{ profile?.full_name || user?.user_metadata?.full_name || 'Not set' }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <p class="text-gray-900">{{ user?.email }}</p>
          </div>
          <div v-if="profile?.phone">
            <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <p class="text-gray-900">{{ profile.phone }}</p>
          </div>
          <div v-if="profile?.bio">
            <label class="block text-sm font-medium text-gray-700 mb-1">Bio</label>
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
              class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
            >
              {{ saving ? 'Saving...' : 'Save Changes' }}
            </button>
            <button
              type="button"
              @click="editing = false"
              class="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      <!-- Account Info -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-bold text-gray-800 mb-4">Account Information</h2>
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
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-bold text-gray-800 mb-4">Actions</h2>
        <button
          @click="handleSignOut"
          class="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
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
})
</script>

