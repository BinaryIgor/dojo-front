<template>
  <div>
    <h1>{{$t('signingUp')}}</h1>
    <form>
      <p>{{$t('name')}}</p>
      <p class="error" v-if="nameError">{{$t('badName')}}</p>
      <input type="text" v-model="name" />
      <p>{{$t('email')}}</p>
      <p class="error" v-if="emailError">{{$t('badEmail')}}</p>
      <input type="email" v-model="email" />
      <p>{{$t('password')}}</p>
      <p class="error" v-if="passwordError">{{$t('badPassword')}}</p>
      <input type="password" v-model="password" />
      <p>{{$t('repeatPassword')}}</p>
      <p class="error" v-if="repeatedPasswordError">{{$t('badRepeatedPassword')}}</p>
      <input type="password" v-model="repeatedPassword" />
    </form>
    <button v-on:click="signUp">{{$t('signUp')}}</button>
    <p v-if="signingUp">{{$t("signUpWait")}}</p>
    <h2>{{$t('hasAccountAlready')}}</h2>
    <button v-on:click="goToSignIn">{{$t('signIn')}}</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from 'vue-class-component'

@Component
export default class SignUp extends Vue {
    
}
</script>