<template>
  <div class="left-container">
    <h2 v-on:click="goToNewTask">{{$t('newTaskHint')}}</h2>
    <input type="text" v-model="title" v-bind:placeholder="$t('searchTaskHint')" />
    <div class="tags">
      <button v-on:click="chooseTags">{{$t('tags')}}</button>
      <div class="tag" v-for="(t, index) in tags" v-bind:key="index">#{{t}}</div>
    </div>
    <div class="locations">
      <button v-on:click="chooseLocations">{{$t('location')}}</button>
      <div class="location" v-for="(l, index) in locations" v-bind:key="index">{{l}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { routes } from "../routes";
import { tasksService as service } from "../App.vue";
import {showModal} from "./common/modals";

@Component
export default class Tasks extends Vue {
  title = "";
  tags: string[] = [];
  locations: string[] = [];

  created(): void {
    const filter = service.getFilters();
    this.title = filter.title;
    this.tags = filter.tags;
    this.locations = filter.locations;
  }

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