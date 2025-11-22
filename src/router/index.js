import { createRouter, createWebHistory } from "vue-router";
import { supabase } from "../lib/supabase";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import AuthLayout from "../layouts/AuthLayout.vue";
import Home from "../pages/Home.vue";
import Venues from "../pages/Venues.vue";
import Login from "../pages/Login.vue";
import Signup from "../pages/Signup.vue";
import Profile from "../pages/Profile.vue";
import NotFound from "../pages/NotFound.vue"

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      { path: "", name: "Home", component: Home },
      { path: "/venues", name: "Venues", component: Venues },
      { path: "/profile", name: "Profile", component: Profile, meta: { requiresAuth: true } },
    ],
  },
  {
    path: "/auth",
    component: AuthLayout,
    children: [
      { path: "login", name: "Login", component: Login },
      { path: "signup", name: "Signup", component: Signup },
    ],
    meta: { requiresGuest: true },
  },
    {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard
router.beforeEach(async (to, from, next) => {
  const { data: { session } } = await supabase.auth.getSession()
  const isAuthenticated = !!session

  // Check if route requires authentication (check both route and child meta)
  const requiresAuth = to.meta.requiresAuth || (to.matched.some(record => record.meta.requiresAuth))
  if (requiresAuth && !isAuthenticated) {
    next({ name: 'Login' })
    return
  }

  // Check if route requires guest (not authenticated)
  if (to.meta.requiresGuest && isAuthenticated) {
    next({ name: 'Home' })
    return
  }

  next()
})

export default router;
