<template>
  <div>
    <h1>{{ $t('signingIn') }}</h1>
    <form>
      <p>{{$t('nameOrEmail')}}</p>
      <p class="error" v-if="nameError">{{$t('badName')}}</p>
      <p class="error" v-if="emailError">{{$t('badEmail')}}</p>
      <input type="text" v-model="nameOrEmail" />
      <p>{{$t('password')}}</p>
      <p class="error" v-if="passwordError">{{$t('badPassword')}}</p>
      <input type="password" v-model="password" />
    </form>
    <button v-on:click="signIn">{{$t('signIn')}}</button>
    <p v-if="signingIn">{{$t("signInWait")}}</p>
    <h2>{{$t('hasNotAccountYet')}}</h2>
    <button v-on:click="goToSignUp">{{$t('signUp')}}</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { SignInInputErrors } from "../core/error/sign-in-input-errors";
import { showModal, showErrorModal } from "./common/modals";
import { routes } from "../routes";
@Component
export default class SignIn extends Vue {
  nameOrEmail = "";
  nameError = false;
  emailError = false;
  password = "";
  passwordError = false;
  signingIn = false;

  setErrors(errors: SignInInputErrors) {
    this.nameError = errors.name;
    this.emailError = errors.email;
    this.passwordError = errors.password;
  }

  removeErrors() {
    this.nameError = this.emailError = this.passwordError;
  }

  signIn() {
    this.removeErrors();
    this.signingIn = true;
  }

  goToSignUp() {
    this.$router.replace(routes.signUp);
  }
}
</script>