<template>
  <div id="app">
    <navigation></navigation>
    <router-view></router-view>
    <modal></modal>
  </div>
</template>
<script lang=ts>
import Start from "./components/Start.vue";
import SignUp from "./components/SignUp.vue";

import Vue from "vue";
import VueRouter from "vue-router";
import VueI18n from "vue-i18n";

import { messages } from "./messages";

import { HttpRequests } from "./core//request/http-requests";
import { SmartRequests } from "./core/request/smart-requests";

import { ApiUserRepository } from "./core/repository/api-user-repository";
import { InBrowserTokenStore } from "./core/store/in-browser-token-store";

import { StartService } from "./core/service/start-service";
import { SignUpService } from "./core/service/sign-up-service";
import { NavigationService } from "./core/service/navigation-service";

import { routes as routesNames } from "./routes";
import { RouteGuard } from "./core/route-guard";
import { getMatchedRouteName } from "./components/common/routes";

Vue.use(VueRouter);
Vue.use(VueI18n);

export const tokenStore = new InBrowserTokenStore();

const routes = [
  { path: "*", component: Start },
  { path: routesNames.signUp, component: SignUp }
];

const defaultRouteName = "Start";
const routeGuard = new RouteGuard(
  tokenStore,
  [
    routesNames.start,
    routesNames.signUp,
    routesNames.signIn,
    routesNames.accountActivation
  ],
  defaultRouteName
);

const router = new VueRouter({ routes });
router.beforeEach((to, from, next) => {
  const route = to.path;
  if (routeGuard.allowsEntry(route, getMatchedRouteName(router, route))) {
    next();
  } else {
    next({ path: "/" });
  }
});
//get it dynamically
const i18n = new VueI18n({
  locale: "pl",
  fallbackLocale: "pl",
  messages
});

const endpoints = {
  signUp: "auth/sign-up",
  signIn: "auth/sign-in",
  activateAccount: "auth/activate",
  currentUserProfile: "user/profile",
  currentUserProfileImageUpload: "user/profile/image",
  passwordUpdate: "user/profile/password"
};

const requests = new SmartRequests(
  new HttpRequests("http://localhost:8080", tokenStore)
);

const userRepository = new ApiUserRepository(
  requests,
  endpoints.signUp,
  endpoints.activateAccount
);

export const startService = new StartService(tokenStore);
export const signUpService = new SignUpService(userRepository);

export const navigationService = new NavigationService(
  [routesNames.home, routesNames.tasks, routesNames.doers, routesNames.profile],
  defaultRouteName
);

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
