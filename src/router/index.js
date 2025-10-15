import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import AuthLayout from "../layouts/AuthLayout.vue";
import Home from "../pages/Home.vue";
import Venues from "../pages/Venues.vue";
import Login from "../pages/Login.vue";
import Signup from "../pages/Signup.vue";

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      { path: "", name: "Home", component: Home },
      { path: "/venues", component: Venues },
      { path: "/login", component: Login },
      { path: "/signup", component: Signup },
    ],
    meta: { requiresAuth: true },
  },
  {
    path: "/auth",
    component: AuthLayout,
    children: [
      { path: "login", name: "Login", component: Login },
      { path: "signup", name: "Signup", component: Signup },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
