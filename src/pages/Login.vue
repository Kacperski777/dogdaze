<template>
  <div class="bg-gray-50 dark:bg-gray-900">
    <div class="grid grid-cols-2 gap-6">
      <!-- Form Card Column -->
      <div class="flex items-center justify-center">
        <div class="w-96 rounded-xl bg-white shadow-md">
          <div
            class="mx-3 -mt-6 mb-4 grid h-28 place-items-center rounded-xl bg-gradient-to-tr from-green-700 to-green-500 text-white shadow-lg"
          >
            <h3 class="text-3xl font-semibold">DogDaze</h3>
          </div>

          <div class="flex flex-col gap-4 p-6">
            <FormKit type="text" label="Email" />
            <FormKit type="password" label="Password" />
            <FormKit type="checkbox" label="Remember Me" />
          </div>

          <div class="p-6 pt-0">
            <button
              type="button"
              class="block w-full cursor-pointer rounded-lg bg-gradient-to-tr from-green-700 to-green-500 py-3 px-6 text-white font-bold shadow-md hover:shadow-lg"
            >
              Sign In
            </button>

            <p class="mt-6 text-center text-sm font-light">
              Don't have an account?
              <a
                href="/auth/signup"
                class="ml-1 font-bold text-green-700 hover:underline"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>


      <div class="flex items-center justify-center h-screen bg-green-500 text-white">
        Logo
      </div>
    </div>
  </div>
</template>
