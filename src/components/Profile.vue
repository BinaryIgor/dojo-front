<template>
  <div>
    <button v-on:click="signOut">{{$t('signOut')}}</button>
  </div>
</template>

<script>
import {profileService as service} from  "../App.vue";
import {routes} from "../routes.js";

export default {
  name: "Profile",
  data() {
    return {};
  },
  methods: {
      signOut() {
          service.signOut();
          this.$router.replace(routes.start);
      }
  }

};
</script>