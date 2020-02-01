<template>
  <div>
    <h1>{{$t('signUp')}}</h1>
    <form>
        <p>{{$t('name')}} </p>
        <p class="error" v-if="nameError">{{$t('badName')}}</p>
        <input type="text" name="name" v-model="name">
        <p>{{$t('email')}} </p>
        <p class="error" v-if="emailError">{{$t('badEmail')}}</p>
        <input type="email" name="email" v-model="email">
        <p>{{$t('password')}} </p>
        <p class="error" v-if="passwordError">{{$t('badPassword')}}</p>
        <input type="password" name="password" v-model="password">
        <p>{{$t('repeatPassword')}} </p>
        <p class="error" v-if="repeatedPasswordError">{{$t('badRepeatedPassword')}}</p>
        <input type="password" name="repeatedPassword" v-model="repeatedPassword">
    </form>
    <button v-on:click="signUp">{{$t('ok')}}</button>
    <p v-if="signingUp">{{$t("signUpWait")}}</p>
  </div>
</template>

<script>
import {signUpServiceFactory as serviceFactory} from "../App.vue";
import {showModal, showErrorModal} from "./common/modals.js";

export default {
  beforeCreate() {
    this.service = serviceFactory();
  },
  name: "SignUp",
  data() {
        return this.service.model;
  },
  methods: {
      signUp() {
          this.service.methods.signUp();
      }
  },
  watch: {
    exceptions: function(exceptions) {
      showErrorModal(this, exceptions);

    },
    signedUp: function() {
      //TODO go to sign in!
      showModal(this, this.$t('signUpSuccessTitle'), this.$t('signUpSuccessMessage'));
    } 
  }
};
</script>