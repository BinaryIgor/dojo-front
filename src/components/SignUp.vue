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
        <input type="password" name="password" v-model="password">
        <p>{{$t('repeatPassword')}} </p>
        <input type="password" name="repeatPassword" v-model="repeatedPassword">
    </form>
    <button v-on:click="signUp">{{$t('ok')}}</button>
  </div>
</template>

<script>
import {signUpModule} from "../core/sign-up.js";


export default {
  name: "SignUp",
  data() {
        return signUpModule.model;
  },
  methods: {
      signUp() {
          signUpModule.methods.validate();
      }
  }
};
</script>