<template>
  <div class="hello">
    <h1>{{ $t('appName') }}</h1>
    <h2>{{ $t('appWelcome') }}</h2>
    <div></div>
    <button v-on:click="goToStart">{{ $t('start') }}</button>
    <button v-on:click="goToContinue">{{ $t('continue') }}</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from 'vue-class-component'
import { startService as service } from "../App.vue";

@Component
export default class Start extends Vue {
  goToStart() {
    console.log("Router", this.$router);
    console.log("Should go to start!");
  }

  goToContinue() {
    if (service.needToSignIn()) {
      console.log("Should sign in");
    } else {
      console.log("Should continue!");
    }
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>