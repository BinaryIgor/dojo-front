<template>
  <div class="container">
    <img v-bind:src="imagePath" />
    <p>{{name}}</p>
    <p>{{email}}</p>
    <button v-on:click="goToEditProfile">{{$t('edit')}}</button>
    <button v-on:click="goToDetails">{{$t('details')}}</button>
    <button v-on:click="goToMessages">{{$t('messages')}}</button>
    <button v-on:click="signOut">{{$t('signOut')}}</button>
  </div>
</template>

<script>
import { profileService as service } from "../App.vue";
import { showErrorModal } from "../components/common/modals.js";
import { routes } from "../routes.js"; 

export default {
  name: "Profile",
  created() {
    this.getProfile();
  },
  data() {
    return {
      imagePath: "",
      name: "",
      email: ""
    };
  },
  methods: {
    getProfile() {
      service.getProfile().then(r => {
        if (r.success) {
          let profile = r.value;
          this.name = profile.name;
          this.email = profile.email;
          this.imagePath = profile.imagePath ? profile.imagePath : "placeholder.jpg";
        } else {
          showErrorModal(this, r.exceptions);
        }
      });
    },
    goToEditProfile() {
      this.$router.push(routes.editProfile);
    },
    goToDetails() {
      this.$router.push(routes.profileDetails);
    },
    goToMessages() {
      this.$router.push(routes.messages);
    },
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