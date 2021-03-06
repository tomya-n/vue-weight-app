import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/HOME.vue";
import Signup from "../views/SIGNUP.vue";
import Dashboard from "../views/DASHBOARD.vue";
import Entry from "../views/ENTRY.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/entry",
    name: "Entry",
    component: Entry,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
