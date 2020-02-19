<template>
  <div v-if="visible">
    <button v-on:click="goToHome" :class="{'active': homeActive}">{{$t('navigation.home')}}</button>
    <button v-on:click="goToTasks" :class="{'active': tasksActive}">{{$t('navigation.tasks')}}</button>
    <button v-on:click="goToDoers" :class="{'active': doersActive}">{{$t('navigation.doers')}}</button>
    <button v-on:click="goToProfile" :class="{'active': profileActive}">{{$t('navigation.profile')}}</button>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { Route } from "vue-router/types/router";
import { navigationService as service } from "../../App.vue";
import { routes } from "../../routes";
import { getMatchedRouteName } from "./routes";
import { NavigationResponse } from "../../core/service/navigation-service";

@Component
export default class Navigation extends Vue {
  readonly active = "active";
  visible = false;
  homeActive = false;
  tasksActive = false;
  doersActive = false;
  profileActive = false;

  //Suspiciously complex
  @Watch("$route", { immediate: true, deep: true })
  onRouteChange(to: Route) {
    this.resolveState(to.path);
  }

  private resolveState(route: string): void {
    const matched = getMatchedRouteName(this, route);
    //TODO change map to proper object
    const response = service.resolveState(route, matched);
    this.visible = response.visible;
    this.homeActive = this.isActive(response, "home");
    this.tasksActive = this.isActive(response, "tasks");
    this.doersActive = this.isActive(response, "doers");
    this.profileActive = this.isActive(response, "profile");
  }

  private isActive(response: NavigationResponse, key: string): boolean {
    return response.navigationState.get(`${key}Active`) ?? false;
  }

  goToHome() {
    this.$router.replace(routes.home);
  }

  goToTasks() {
    this.$router.replace(routes.tasks);
  }

  goToDoers() {
    this.$router.replace(routes.doers);
  }

  goToProfile() {
    this.$router.replace(routes.profile);
  }
}
</script>

<style scoped>
div {
  overflow: hidden;
  background-color: var(--primary-light);
  top: 0;
  position: sticky;
  z-index: 99;
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