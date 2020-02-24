<template>
  <div class="centered-container">
    <div class="location-title">
      <img v-on:click="goBack" class="icon" src="/back_arrow_black.png" />
      <h1>{{$t('location')}}</h1>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class Location extends Vue {
  goBack(): void {
    //TODO is there better way to go back?
    this.$router.go(-1);
  }
}
</script>

<style scoped>
.location-title {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  width: 100%;
  height: 100%;
  align-items: center;
}
</style>