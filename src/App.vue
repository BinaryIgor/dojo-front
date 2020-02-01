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
import Vue from "vue";
import VueRouter from "vue-router";
import VueI18n from "vue-i18n";
import { routes as routesNames } from "./routes.js";
import { Requests } from "./core/requests.js";
import { SmartRequests} from "./core/smart-requests.js";
import { UserRepository } from "./core/repository/user-repository.js";
import { messages } from "./messages.js";
import {SignUpService} from "./core/service/sign-up-service.js";

Vue.use(VueRouter);
Vue.use(VueI18n);

const routes = [
  { path: "*", component: Start },
  { path: routesNames.signUp, component: SignUp },
  { path: routesNames.signIn, component: SignIn }
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

const requests = new Requests('https://jsonplaceholder.typicode.com');
const smartRequests = new SmartRequests(requests);
const userRepository = new UserRepository(smartRequests);
export const signUpServiceFactory = () => new SignUpService(userRepository);
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
