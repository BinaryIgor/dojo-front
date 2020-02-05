<template>
  <div class="container">
      <img v-bind:src="imagePath" />
      <p>{{name}}</p>
      <p>{{email}}</p>
      <button v-on:click="editProfile">{{$t('edit')}}</button>
      <button v-on:click="goToDetails">{{$t('details')}}</button>
      <button v-on:click="goToMessages">{{$t('messages')}}</button>
      <button v-on:click="signOut">{{$t('signOut')}}</button>
  </div>
</template>

<script>
import { profileService as service } from "../App.vue";

export default {
  name: "Profile",
  data() {
    return {
      imagePath:
        "https://yt3.ggpht.com/a/AGF-l7_vI0Blaq6BKt2njRyxw84y7SzBddQSdzmEFw=s900-c-k-c0xffffffff-no-rj-mo",
      name: "",
      email: ""
    };
  },
  methods: {
    editProfile() {},
    goToDetails() {},
    goToMessages() {},
    signOut() {
      service.signOut();
      this.$router.replace("/");
    }
  }
};
</script>

<style scoped>
img {
  max-width: 20%;
  max-height: 30%;
}

button {
  width: 40%;
}

.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}
</style>