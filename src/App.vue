<template>
  <div id="app">
    <navigation></navigation>
    <router-view></router-view>
    <modal></modal>
  </div>
</template>

<script>
import Start from "./components/Start.vue";
import SignIn from "./components/SignIn.vue";
import SignUp from "./components/SignUp.vue";
import AccountActivation from "./components/AccountActivation.vue";
import Home from "./components/Home.vue";
import Events from "./components/Events.vue";
import Tasks from "./components/Tasks.vue";
import Doers from "./components/Doers.vue";
import Profile from "./components/Profile.vue";
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
import { AccountActivationService } from "./core/service/account-activation-service.js";
import { NavigationService } from "./core/service/navigation-service.js";
import { tokenStore } from "./core/storage/token-store.js";

Vue.use(VueRouter);
Vue.use(VueI18n);

const routes = [
  { path: "*", component: Start },
  { path: routesNames.signUp, component: SignUp },
  { path: routesNames.signIn, component: SignIn },
  { path: routesNames.home, component: Home },
  { path: routesNames.events, component: Events},
  { path: routesNames.tasks, component: Tasks},
  { path: routesNames.doers, component: Doers },
  { path: routesNames.profile, component: Profile},
  { path: routesNames.accountActivation, component: AccountActivation }
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

const endpoints = {
  signUp: "auth/sign-up",
  signIn: "auth/sign-in",
  activateAccount: "auth/activate"
};

//TODO remove, tmp develop purposes only
tokenStore.clear();

const requests = new Requests("http://localhost:8080", tokenStore);
const smartRequests = new SmartRequests(requests);

const userRepository = new UserRepository(smartRequests, endpoints);

export const startService = new StartService(tokenStore);
export const signUpService = new SignUpService(userRepository);
export const signInService = new SignInService(userRepository, tokenStore);
export const accountActivationService = new AccountActivationService(
  userRepository
);
export const navigationService = new NavigationService([
  routesNames.home,
  routesNames.events,
  routesNames.tasks,
  routesNames.doers,
  routesNames.profile
]);
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
