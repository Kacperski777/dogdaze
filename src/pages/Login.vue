<template>
  <div class="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
    <div class="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
      <!-- Form Card Column -->
      <div class="flex items-center justify-center p-4 lg:p-8 animate-fade-in">
        <div class="w-full max-w-md">
          <div class="mb-8 text-center lg:text-left">
            <h1 class="text-4xl font-bold mb-2" style="font-family: var(--font-display);">
              Welcome Back!
            </h1>
            <p class="text-gray-600">Sign in to continue exploring dog-friendly places</p>
          </div>

          <div class="bg-white rounded-2xl shadow-xl p-8 animate-scale-in">
            <div class="mb-6">
              <h2 class="text-2xl font-bold text-gray-800 mb-1" style="font-family: var(--font-display);">
                DogDaze
              </h2>
              <p class="text-gray-500 text-sm">Your adventure starts here</p>
            </div>
            
            <form @submit.prevent="handleLogin" class="space-y-5">
              <div v-if="error" class="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg animate-slide-in">
                <p class="text-sm font-medium">{{ error }}</p>
              </div>
              
              <div>
            <FormKit 
              type="email" 
              label="Email" 
              v-model="email"
              validation="required|email"
              :disabled="loading"
                  label-class="text-gray-700 font-medium mb-2"
                  input-class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
              </div>
              
              <div>
            <FormKit 
              type="password" 
              label="Password" 
              v-model="password"
              validation="required"
              :disabled="loading"
                  label-class="text-gray-700 font-medium mb-2"
                  input-class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
              </div>
              
              <div class="flex items-center justify-between">
            <FormKit 
              type="checkbox" 
              label="Remember Me" 
              v-model="rememberMe"
              :disabled="loading"
            />
                <a href="#" class="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                :disabled="loading"
                class="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <span v-if="loading" class="flex items-center justify-center">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing In...
                </span>
                <span v-else>Sign In</span>
              </button>

              <p class="text-center text-sm text-gray-600 mt-6">
                Don't have an account?
                <router-link
                  to="/auth/signup"
                  class="ml-1 font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  Sign up
                </router-link>
              </p>
            </form>
            </div>
        </div>
      </div>

      <!-- Illustration Column -->
      <div class="hidden lg:flex items-center justify-center p-8 bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 relative overflow-hidden">
        <div class="absolute inset-0 bg-black opacity-10"></div>
        <div class="relative z-10 text-center text-white animate-fade-in">
          <div class="mb-8 animate-float">
            
            <img 
              src="../assets/dog-walking-amico.svg" 
              alt="Dog walking illustration"
              class="w-full max-w-md mx-auto"
            />
          </div>
          <h2 class="text-5xl font-bold mb-4" style="font-family: var(--font-display);">
            Explore Together
          </h2>
          <p class="text-xl text-emerald-50">
            Discover the best dog-friendly places in your area
          </p>
        </div>
        <!-- Decorative elements -->
        <div class="absolute top-20 left-20 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl animate-float" style="animation-delay: 0s;"></div>
        <div class="absolute bottom-20 right-20 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl animate-float" style="animation-delay: 1s;"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import anime from 'animejs/lib/anime.es.js'

const router = useRouter()
const { signIn } = useAuth()

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const loading = ref(false)
const error = ref('')

onMounted(() => {
  // Animate form elements on mount
  anime({
    targets: '.animate-scale-in',
    scale: [0.9, 1],
    opacity: [0, 1],
    duration: 600,
    easing: 'easeOutElastic(1, .8)'
  })
})

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
    // Animate error appearance
    anime({
      targets: '.animate-slide-in',
      translateX: [-20, 0],
      opacity: [0, 1],
      duration: 400
    })
  } else if (user) {
    // Success animation before redirect
    anime({
      targets: 'button[type="submit"]',
      scale: [1, 0.95, 1],
      duration: 300
    })
    setTimeout(() => {
    router.push('/')
    }, 300)
  }
  
  loading.value = false
}
</script>
