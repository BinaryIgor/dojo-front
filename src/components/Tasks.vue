<template>
  <div class="left-container">
    <h2 v-on:click="goToNewTask">{{$t('newTaskHint')}}</h2>
    <input v-bind:placeholder="$t('searchTaskHint')" />
    <div class="tags">
      <button>{{$t('tags')}}</button>
      <div class="tag" v-for="(t, index) in tags" v-bind:key="index">#{{t}}</div>
    </div>
    <div class="locations">
      <button>{{$t('location')}}</button>
      <div class="location" v-for="(l, index) in locations" v-bind:key="index">{{l}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { routes } from "../routes";

@Component
export default class Tasks extends Vue {
  //TODO unhardcode
  tags: string[] = ["Remont", "Rozrywka", "Matematyka", "Wyzwanie"];

  locations: string[] = ["Warszawa, 20km", "Zdalnie"];

  goToNewTask(): void {
    this.$router.push(routes.newTask);
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