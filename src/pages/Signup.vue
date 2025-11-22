<template>
  <div class="bg-gray-50 dark:bg-gray-900 min-h-screen">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Form Card Column -->
      <div class="flex items-center justify-center min-h-screen p-4">
        <div class="w-full max-w-md rounded-xl bg-white shadow-md">
          <div
            class="mx-3 -mt-6 mb-4 grid h-28 place-items-center rounded-xl bg-gradient-to-tr from-green-700 to-green-500 text-white shadow-lg"
          >
            <h3 class="text-3xl font-semibold">DogDaze</h3>
          </div>

          <form @submit.prevent="handleSignup" class="flex flex-col gap-4 p-6">
            <div v-if="error" class="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {{ error }}
            </div>
            
            <div v-if="success" class="p-3 bg-green-100 border border-green-400 text-green-700 rounded">
              {{ success }}
            </div>

            <FormKit 
              type="text" 
              label="Full Name" 
              v-model="fullName"
              validation="required"
              :disabled="loading"
            />
            <FormKit 
              type="email" 
              label="Email" 
              v-model="email"
              validation="required|email"
              :disabled="loading"
            />
            <FormKit 
              type="password" 
              label="Password" 
              v-model="password"
              validation="required|length:6"
              :disabled="loading"
            />
            <FormKit 
              type="password" 
              label="Confirm Password" 
              v-model="confirmPassword"
              validation="required"
              :disabled="loading"
            />

            <div class="p-6 pt-0">
              <button
                type="submit"
                :disabled="loading"
                class="block w-full cursor-pointer rounded-lg bg-gradient-to-tr from-green-700 to-green-500 py-3 px-6 text-white font-bold shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="loading">Creating Account...</span>
                <span v-else>Sign Up</span>
              </button>

              <p class="mt-6 text-center text-sm font-light">
                Already have an account?
                <router-link
                  to="/auth/login"
                  class="ml-1 font-bold text-green-700 hover:underline"
                >
                  Sign in
                </router-link>
              </p>
            </div>
          </form>
        </div>
      </div>

      <div class="hidden md:flex items-center justify-center h-screen bg-gradient-to-br from-green-500 to-green-700 text-white">
        <div class="text-center">
          <h1 class="text-5xl font-bold mb-4">Join DogDaze!</h1>
          <p class="text-xl">Discover the best dog-friendly places</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { signUp } = useAuth()

const fullName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const error = ref('')
const success = ref('')

const handleSignup = async () => {
  error.value = ''
  success.value = ''
  loading.value = true

  if (!fullName.value || !email.value || !password.value || !confirmPassword.value) {
    error.value = 'Please fill in all fields'
    loading.value = false
    return
  }

  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match'
    loading.value = false
    return
  }

  if (password.value.length < 6) {
    error.value = 'Password must be at least 6 characters'
    loading.value = false
    return
  }

  const { user, error: signUpError } = await signUp(email.value, password.value, {
    full_name: fullName.value
  })
  
  if (signUpError) {
    error.value = signUpError
  } else if (user) {
    success.value = 'Account created successfully! Please check your email to verify your account.'
    // Optionally redirect after a delay
    setTimeout(() => {
      router.push('/auth/login')
    }, 2000)
  }
  
  loading.value = false
}
</script>
