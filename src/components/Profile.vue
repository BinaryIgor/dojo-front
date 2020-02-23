<template>
  <div class="centered-container body">
    <img v-bind:src="imagePath" class="profile"/>
    <h2>{{name}}</h2>
    <h2>{{email}}</h2>
    <button v-on:click="goToEditProfile">{{$t('edit')}}</button>
    <button v-on:click="goToDetails">{{$t('details')}}</button>
    <button v-on:click="goToMessages">{{$t('messages')}}</button>
    <button v-on:click="signOut">{{$t('signOut')}}</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { profileService as service } from "../App.vue";
import { showErrorModal } from "../components/common/modals";
import { routes } from "../routes";

@Component
export default class Profile extends Vue {
    
    imagePath = "";
    name = "";
    email = "";

    created(): void {
      this.getProfile();
    }

    getProfile(): void {
      service.getProfile().then(r => {
        if (r.success) {
          const profile = r.value;
          this.name = profile.name;
          this.email = profile.email;
          //TODO externalize this
          this.imagePath = profile.imagePath ? profile.imagePath : 'placeholder.jpg';
        } else {
          showErrorModal(this, r.exceptions);
        }
      });
    }

    goToEditProfile(): void {
      this.$router.push(routes.editProfile);
    }

    goToDetails(): void {
      this.$router.push(routes.profileDetails);
    }

    goToMessages(): void {
      this.$router.push(routes.messages);
    }

    signOut(): void {
      service.signOut();
      this.$router.replace('/');
    }
}
</script>

<style scoped>
button {
  width: 40%;
}
</style>