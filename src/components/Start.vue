<template>
  <div class="hello">
    <h1>{{ $t('appName') }}</h1>
    <h2>{{ $t('appWelcome') }}</h2>
    <div></div>
    <button v-on:click="goToStart">{{ $t('start') }}</button>
    <button v-on:click="goToContinue">{{ $t('continue') }}</button>
  </div>
</template>

<script>
import {routes} from '../routes.js';

export default {
  name: 'Start',
  methods: {
    goToStart() { 
      this.$router.push(routes.signUp);
    },
    goToContinue() {
      this.$router.push(routes.signIn);
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
