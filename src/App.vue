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
import Tasks from "./components/Tasks.vue";
import Doers from "./components/Doers.vue";
import Profile from "./components/Profile.vue";
import EditProfile from "./components/EditProfile.vue";
import ProfileDetails from "./components/ProfileDetails.vue";
import Messages from "./components/Messages.vue";
import Vue from "vue";
import VueRouter from "vue-router";
import VueI18n from "vue-i18n";
import { routes as routesNames } from "./routes.js";
import { getMatchedRouteName } from "./components/common/router.js";
import { Requests } from "./core/requests.js";
import { SmartRequests } from "./core/smart-requests.js";
import { UserRepository } from "./core/repository/user-repository.js";
import { UserProfileRepository } from "./core/repository/user-profile-repository.js";
import { messages } from "./messages.js";
import { StartService } from "./core/service/start-service.js";
import { SignUpService } from "./core/service/sign-up-service.js";
import { SignInService } from "./core/service/sign-in-service.js";
import { AccountActivationService } from "./core/service/account-activation-service.js";
import { ProfileService } from "./core/service/profile-service.js";
import { NavigationService } from "./core/service/navigation-service.js";
import { tokenStore } from "./core/store/token-store.js";
import { RouteGuard } from "./core/route-guard.js";

Vue.use(VueRouter);
Vue.use(VueI18n);

const routes = [
  { path: "*", component: Start },
  { path: routesNames.signUp, component: SignUp },
  { path: routesNames.signIn, component: SignIn },
  { path: routesNames.home, component: Home },
  { path: routesNames.tasks, component: Tasks },
  { path: routesNames.doers, component: Doers },
  { path: routesNames.profile, component: Profile},
  { path: routesNames.editProfile, component: EditProfile},
  { path: routesNames.profileDetails, component: ProfileDetails},
  { path: routesNames.messages, component: Messages},
  { path: routesNames.accountActivation, component: AccountActivation }
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
  let route = to.path;
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

export default {
  name: "app",
  router,
  i18n
};

const endpoints = {
  signUp: "auth/sign-up",
  signIn: "auth/sign-in",
  activateAccount: "auth/activate",
  currentUserProfile: "user/profile"
};

const requests = new Requests("http://localhost:8080", tokenStore);
const smartRequests = new SmartRequests(requests);

const userRepository = new UserRepository(smartRequests, endpoints);
const userProfileRepository = new UserProfileRepository(smartRequests, endpoints, 'image');

export const startService = new StartService(tokenStore);
export const signUpService = new SignUpService(userRepository);
export const signInService = new SignInService(userRepository, tokenStore);
export const accountActivationService = new AccountActivationService(
  userRepository
);
export const profileService = new ProfileService(tokenStore, userProfileRepository);

export const navigationService = new NavigationService(
  [
    routesNames.home,
    routesNames.tasks,
    routesNames.doers,
    routesNames.profile
  ],
  defaultRouteName
);
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
