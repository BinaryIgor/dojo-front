<template>
  <div class="left-container">
    <h2 v-on:click="goToNewTask">{{$t('newTaskHint')}}</h2>
    <!--TODO better enum support-->
    <search searchCategory=0></search>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { routes } from "../routes";
import {showModal} from "./common/modals";

@Component
export default class Tasks extends Vue {
  
  goToNewTask(): void {
    this.$router.push(routes.newTask);
  }

  chooseTags(): void {
    this.$router.push(routes.tasksTags);
  }

  chooseLocations(): void {
    this.$router.push(routes.tasksLocations);
  }
}
</script>

<style scoped>
h2 {
  text-align: right;
  cursor: pointer;
}
input,
.tags {
  margin-bottom: var(--padding-medium);
}
input {
  padding: var(--padding-medium);
}
</style>