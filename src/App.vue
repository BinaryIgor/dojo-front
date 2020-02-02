<template>
  <div id="app">
    <router-view></router-view>
    <modal></modal>
  </div>
</template>

<script>
import Start from "./components/Start.vue";
import SignIn from "./components/SignIn.vue";
import SignUp from "./components/SignUp.vue";
import Home from "./components/Home.vue";
import Vue from "vue";
import VueRouter from "vue-router";
import VueI18n from "vue-i18n";
import { routes as routesNames } from "./routes.js";
import { Requests } from "./core/requests.js";
import { SmartRequests } from "./core/smart-requests.js";
import { UserRepository } from "./core/repository/user-repository.js";
import { messages } from "./messages.js";
import { StartService } from "./core/service/start-service.js";
import { SignUpService } from "./core/service/sign-up-service.js";
import { SignInService } from "./core/service/sign-in-service.js";
import { tokenStore } from "./core/storage/token-store.js";

Vue.use(VueRouter);
Vue.use(VueI18n);

const routes = [
  { path: "*", component: Start },
  { path: routesNames.signUp, component: SignUp },
  { path: routesNames.signIn, component: SignIn },
  { path: routesNames.home, component: Home }
];
const router = new VueRouter({ routes });

//get it dynamically
const i18n = new VueI18n({
  locale: "pl",
  fallbackLocale: "pl",
  messages
});

export default {
  name: "app",
  router,
  i18n
};

//TODO remove, tmp develop purposes only
tokenStore.clear();

const requests = new Requests("http://localhost:8080", tokenStore);
const smartRequests = new SmartRequests(requests);

const userRepository = new UserRepository(smartRequests);

export const startService = new StartService(tokenStore);
export const signUpService = new SignUpService(userRepository);
export const signInService = new SignInService(userRepository, tokenStore);
</script>


<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
