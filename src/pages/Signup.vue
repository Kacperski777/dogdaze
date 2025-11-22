<template>
  <div class="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-pink-50">
    <div class="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
      <!-- Form Card Column -->
      <div class="flex items-center justify-center p-4 lg:p-8 animate-fade-in">
        <div class="w-full max-w-md">
          <div class="mb-8 text-center lg:text-left">
            <h1 class="text-4xl font-bold mb-2" style="font-family: var(--font-display);">
              Join DogDaze!
            </h1>
            <p class="text-gray-600">Start your adventure with your furry friend</p>
          </div>

          <div class="bg-white rounded-2xl shadow-xl p-8 animate-scale-in">
            <div class="mb-6">
              <h2 class="text-2xl font-bold text-gray-800 mb-1" style="font-family: var(--font-display);">
                Create Account
              </h2>
              <p class="text-gray-500 text-sm">Sign up to discover amazing places</p>
            </div>
            <form @submit.prevent="handleSignup" class="space-y-5">
              <div v-if="error" class="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg animate-slide-in">
                <p class="text-sm font-medium">{{ error }}</p>
              </div>
              
              <div v-if="success" class="p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded-lg animate-slide-in">
                <p class="text-sm font-medium">{{ success }}</p>
            </div>

              <div>
            <FormKit 
              type="text" 
              label="Full Name" 
              v-model="fullName"
              validation="required"
              :disabled="loading"
                  label-class="text-gray-700 font-medium mb-2"
                  input-class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
              </div>
              
          <div>
            <FormKit 
              type="email" 
              label="Email" 
              v-model="email"
              validation="required|email"
              :disabled="loading"
                  label-class="text-gray-700 font-medium mb-2"
                  input-class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
              </div>
              
              <div>
            <FormKit 
              type="password" 
              label="Password" 
              v-model="password"
              validation="required|length:6"
              :disabled="loading"
                  label-class="text-gray-700 font-medium mb-2"
                  input-class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
                <p class="text-xs text-gray-500 mt-1">Must be at least 6 characters</p>
              </div>
              
           
            <FormKit 
              type="password" 
              label="Confirm Password" 
              v-model="confirmPassword"
              validation="required"
              :disabled="loading"
                  label-class="text-gray-700 font-medium mb-2"
                  input-class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
 

              <button
                type="submit"
                :disabled="loading"
                class="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <span v-if="loading" class="flex items-center justify-center">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </span>
                <span v-else>Sign Up</span>
              </button>

              <p class="text-center text-sm text-gray-600 mt-6">
                Already have an account?
                <router-link
                  to="/auth/login"
                  class="ml-1 font-semibold text-amber-600 hover:text-amber-700 transition-colors"
                >
                  Sign in
                </router-link>
              </p>
            </form>
            </div>
           
        </div>
      </div>

      <!-- Illustration Column -->
      <div class="hidden lg:flex items-center justify-center p-8 bg-gradient-to-br from-amber-400 via-orange-400 to-pink-400 relative overflow-hidden">
        <div class="absolute inset-0 bg-black opacity-10"></div>
        <div class="relative z-10 text-center text-white animate-fade-in">
          <div class="mb-8 animate-float">
            <img 
              src="../assets/join.svg" 
              alt="Join illustration"
              class="w-6/12 max-w-md mx-auto"
           
            />
          </div>
          <h2 class="text-5xl font-bold mb-4" style="font-family: var(--font-display);">
            Start Your Journey
          </h2>
          <p class="text-xl text-amber-50">
            Join thousands of dog lovers discovering amazing places
          </p>
        </div>
        <!-- Decorative elements -->
        <div class="absolute top-20 right-20 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl animate-float" style="animation-delay: 0.5s;"></div>
        <div class="absolute bottom-20 left-20 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl animate-float" style="animation-delay: 1.5s;"></div>
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
const { signUp } = useAuth()

const fullName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const error = ref('')
const success = ref('')

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
    anime({
      targets: '.animate-slide-in',
      translateX: [-20, 0],
      opacity: [0, 1],
      duration: 400
    })
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
    anime({
      targets: '.animate-slide-in',
      translateX: [-20, 0],
      opacity: [0, 1],
      duration: 400
    })
  } else if (user) {
    success.value = 'Account created successfully! Please check your email to verify your account.'
    anime({
      targets: '.animate-slide-in',
      translateX: [-20, 0],
      opacity: [0, 1],
      duration: 400
    })
    // Redirect after a delay
    setTimeout(() => {
      router.push('/auth/login')
    }, 2000)
  }
  
  loading.value = false
}
</script>
