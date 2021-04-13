import { createRouter, createWebHistory } from "vue-router";
import Index from "./index.vue";
import Home from "./home.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Index,
    },
    {
      path: "/home",
      component: Home,
    },
  ],
});
