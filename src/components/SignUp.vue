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
import Component from "vue-class-component";
import InputErrors from "../core/error/input-errors";
import NewUserInputErrors from "../core/error/new-user-input-errors";
import { signUpService as service } from "../App.vue";
import { showModal, showErrorModal } from "./common/modals";
import { routes } from "../routes";
import NewUserInput from "../core/model/input/new-user-input";

@Component
export default class SignUp extends Vue {
  name = "";
  nameError = false;
  email = "";
  emailError = false;
  password = "";
  passwordError = false;
  repeatedPassword = "";
  repeatedPasswordError = false;
  signingUp = false;

  setErrors(errors: NewUserInputErrors): void {
    this.nameError = errors.name;
    this.emailError = errors.email;
    this.passwordError = errors.password;
    this.repeatedPasswordError = errors.repeatedPassword;
  }

  removeErrors(): void {
    this.nameError = this.emailError = this.passwordError = this.repeatedPasswordError = false;
  }

  signUp(): void {
    this.removeErrors();
    this.signingUp = true;
    const newUserInput = new NewUserInput(
      this.name,
      this.email,
      this.password,
      this.repeatedPassword
    );
    service.signUp(newUserInput).then(r => {
      this.signingUp = false;
      if (r.success) {
        //TODO create types instead of strings
        showModal(this, "signUpSuccessTitle", "signUpSucessMessage");
        this.$router.replace(routes.signIn);
      } else {
        this.setErrors(r.inputErrors);
        showErrorModal(this, r.requestErrors);
      }
    });
  }

  goToSignIn(): void {
    this.$router.replace(routes.signIn);
  }
}
</script>