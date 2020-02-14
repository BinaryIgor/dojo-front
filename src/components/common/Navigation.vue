<template>
  <div v-if="visible">
    <button v-on:click="goToHome" :class="{'active': homeActive}">{{$t('navigation.home')}}</button>
    <button v-on:click="goToTasks" :class="{'active': tasksActive}">{{$t('navigation.tasks')}}</button>
    <button v-on:click="goToDoers" :class="{'active': doersActive}">{{$t('navigation.doers')}}</button>
    <button v-on:click="goToProfile" :class="{'active': profileActive}">{{$t('navigation.profile')}}</button>
  </div>
</template>

<script>
import { navigationService as service } from "../../App.vue";
import { routes } from "../../routes.js";
import {getMatchedRouteName} from "./router.js";

export default {
  created() {
    this._resolveState(this.$router.currentRoute.path);
  },
  watch: {
    $route(to) {
      this._resolveState(to.path);
    }
  },
  data() {
    return {
      active: "active",
      visible: false,
      homeActive: false,
      tasksActive: false,
      doersActive: false,
      profileActive: false
    };
  },
  methods: {
    _resolveState(route) {
      let matched = getMatchedRouteName(this.$router, route);
      let response = service.resolveState(route, matched);
      this.visible = response.visible;
      this.homeActive = response.navigationState.homeActive;
      this.tasksActive = response.navigationState.tasksActive;
      this.doersActive = response.navigationState.doersActive;
      this.profileActive = response.navigationState.profileActive;
    },
    goToHome() {
      this.$router.replace(routes.home);
    },
    goToEvents() {
      this.$router.replace(routes.events);
    },
    goToTasks() {
      this.$router.replace(routes.tasks);
    },
    goToDoers() {
      this.$router.replace(routes.doers);
    },
    goToProfile() {
      this.$router.replace(routes.profile);
    }
  }
};
</script>

<style scoped>
div {
  overflow: hidden;
  background-color: var(--primary-light);
  top: 0;
  position: sticky;
  z-index: 99;
  margin-bottom: var(--padding-medium);
}
div button {
  background-color: inherit;
  float: left;
  border: none;
  outline: none;
  cursor: pointer;
  padding: var(--padding-large) var(--padding-large);
  margin: 0;
  transition: 0.5s;
  font-size: var(--font-medium-large);
  width: 25%;
  outline: none;
  border: none;
  border-radius: 0;
}

div button:hover {
  color: var(--font-light);
  background-color: var(--primary-dark);
  border: none;
  outline: none;
}

div button.active {
  background-color: var(--primary);
}
</style>