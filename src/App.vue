<template>
  <div id="app">
    <navigation></navigation>
    <router-view></router-view>
    <modal></modal>
  </div>
</template>
<script lang=ts>
import Start from "./components/Start.vue";
import Vue from "vue";
import VueRouter from "vue-router";
import VueI18n from "vue-i18n";
import { messages } from "./messages";
import {InBrowserTokenStore} from "./core/store/in-browser-token-store";
import {StartService} from "./core/service/start-service";

Vue.use(VueRouter);
Vue.use(VueI18n);
const routes = [
  { path: "*", component: Start },
];

const router = new VueRouter({ routes });
//get it dynamically
const i18n = new VueI18n({
  locale: "pl",
  fallbackLocale: "pl",
  messages
});

export const tokenStore = new InBrowserTokenStore();
export const startService = new StartService(tokenStore);

export default {
  router,
  i18n
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
