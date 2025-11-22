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

          <form @submit.prevent="handleLogin" class="flex flex-col gap-4 p-6">
            <div v-if="error" class="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {{ error }}
            </div>
            
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
              validation="required"
              :disabled="loading"
            />
            <FormKit 
              type="checkbox" 
              label="Remember Me" 
              v-model="rememberMe"
              :disabled="loading"
            />

            <div class="p-6 pt-0">
              <button
                type="submit"
                :disabled="loading"
                class="block w-full cursor-pointer rounded-lg bg-gradient-to-tr from-green-700 to-green-500 py-3 px-6 text-white font-bold shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="loading">Signing In...</span>
                <span v-else>Sign In</span>
              </button>

              <p class="mt-6 text-center text-sm font-light">
                Don't have an account?
                <router-link
                  to="/auth/signup"
                  class="ml-1 font-bold text-green-700 hover:underline"
                >
                  Sign up
                </router-link>
              </p>
            </div>
          </form>
        </div>
      </div>

      <div class="hidden md:flex items-center justify-center h-screen bg-gradient-to-br from-green-500 to-green-700 text-white">
        <div class="text-center">
          <h1 class="text-5xl font-bold mb-4">Welcome Back!</h1>
          <p class="text-xl">Explore dog-friendly places together</p>
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
const { signIn } = useAuth()

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  error.value = ''
  loading.value = true

  if (!email.value || !password.value) {
    error.value = 'Please fill in all fields'
    loading.value = false
    return
  }

  const { user, error: signInError } = await signIn(email.value, password.value)
  
  if (signInError) {
    error.value = signInError
  } else if (user) {
    router.push('/')
  }
  
  loading.value = false
}
</script>
