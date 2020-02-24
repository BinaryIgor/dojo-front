<template>
  <div id="app">
    <navigation></navigation>
    <router-view></router-view>
    <modal></modal>
  </div>
</template>
<script lang="ts">
import Start from "./components/Start.vue";
import SignUp from "./components/SignUp.vue";
import SignIn from "./components/SignIn.vue";
import AccountActivation from "./components/AccountActivation.vue";
import Home from "./components/Home.vue";
import Tasks from "./components/Tasks.vue";
import EditTask from "./components/EditTask.vue";
import Doers from "./components/Doers.vue";
import Profile from "./components/Profile.vue";
import EditProfile from "./components/EditProfile.vue";
import ProfileDetails from "./components/ProfileDetails.vue";
import Messages from "./components/Messages.vue";
import Tags from "./components/common/Tags.vue";
import Locations from "./components/common/Locations.vue";

import Vue from "vue";
import VueRouter from "vue-router";
import VueI18n from "vue-i18n";

import { messages } from "./messages";

import HttpRequests from "./core//request/http-requests";
import SmartRequestsWrapper from "./core/request/smart-requests-wrapper";

import ApiUserRepository from "./core/repository/api-user-repository";
import ApiUserProfileRepository from "./core/repository/api-user-profile-repository";
import CacheableUserProfileRepository from "./core/repository/cacheable-user-profile-repository";
import InBrowserTokenStore from "./core/store/in-browser-token-store";
import ApiTokenRepository from "./core/repository/api-token-repository";
import InMemorySearchFilterRepository from "./core/repository/in-memory-search-filter-repository";

import StartService from "./core/service/start-service";
import SignUpService from "./core/service/sign-up-service";
import SignInService from "./core/service/sign-in-service";
import TasksService from "./core/service/tasks-service";
import {TagsServiceProvider, TagsCategory} from "./core/service/tags-service-provider";
import ProfileService from "./core/service/profile-service";
import EditProfileService from "./core/service/edit-profile-service";
import { NavigationService } from "./core/service/navigation-service";

import { routes as routesNames } from "./routes";
import RouteGuard from "./core/route-guard";
import { getMatchedRouteName } from "./components/common/routes";

Vue.use(VueRouter);
Vue.use(VueI18n);

export const tokenStore = new InBrowserTokenStore();

const routes = [
  { path: "*", component: Start },
  { path: routesNames.signUp, component: SignUp },
  { path: routesNames.signIn, component: SignIn },
  { path: routesNames.accountActivation, component: AccountActivation },
  { path: routesNames.home, component: Home },
  { path: routesNames.tasks, component: Tasks },
  { path: routesNames.newTask, component: EditTask },
  { path: routesNames.tasksTags, component: Tags, props: {tagsCategory: TagsCategory.TASKS} },
  { path: routesNames.tasksLocations, component: Locations},
  { path: routesNames.doers, component: Doers },
  { path: routesNames.profile, component: Profile },
  { path: routesNames.editProfile, component: EditProfile },
  { path: routesNames.profileDetails, component: ProfileDetails },
  { path: routesNames.messages, component: Messages }
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

const requests = new SmartRequestsWrapper(
  new HttpRequests("http://localhost:8080", tokenStore)
);

const userRepository = new ApiUserRepository(
  requests,
  endpoints.signUp,
  endpoints.activateAccount
);
const userProfileRepository = new CacheableUserProfileRepository(
  new ApiUserProfileRepository(
    requests,
    endpoints.currentUserProfile,
    endpoints.currentUserProfileImageUpload,
    endpoints.passwordUpdate,
    "image"
  )
);
const tokenRepository = new ApiTokenRepository(requests, endpoints.signIn);
const tasksFilterRepository = new InMemorySearchFilterRepository();
const doersFilterRepository = new InMemorySearchFilterRepository();

export const startService = new StartService(tokenStore);
export const signUpService = new SignUpService(userRepository);
export const signInService = new SignInService(tokenRepository, tokenStore);
export const tasksService = new TasksService(tasksFilterRepository);
export const tagsServiceProvider = new TagsServiceProvider(tasksFilterRepository, doersFilterRepository);
export const profileService = new ProfileService(tokenStore, userProfileRepository);
export const editProfileService = new EditProfileService(userProfileRepository);

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
