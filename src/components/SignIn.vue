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
import SignInInput from "../core/model/input/sign-in-input";
import SignInInputErrors from "../core/error/sign-in-input-errors";
import { showModal, showErrorModal } from "./common/modals";
import { routes } from "../routes";
import { signInService as service } from "../App.vue";

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
    this.nameError = this.emailError = this.passwordError = false;
  }

  signIn() {
    this.removeErrors();
    this.signingIn = true;
    const input = new SignInInput(this.nameOrEmail, this.password);

    service.signIn(input).then(r => {
      this.signingIn = false;
      if (r.success) {
        this.$router.replace(routes.home);
      } else {
        this.setErrors(r.inputErrors);
        showErrorModal(this, r.requestErrors);
      }
    });
  }

  goToSignUp() {
    this.$router.replace(routes.signUp);
  }
}
</script>