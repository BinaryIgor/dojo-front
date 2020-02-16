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

<script>
import { signUpService as service } from "../App.vue";
import { showModal, showErrorModal } from "./common/modals.js";
import { routes } from "../routes.js";

export default {
  name: "SignUp",
  data() {
    return {
      name: "",
      nameError: false,
      email: "",
      emailError: false,
      password: "",
      passwordError: false,
      repeatedPassword: "",
      repeatedPasswordError: false,
      signingUp: false
    };
  },
  methods: {
    _setErrors(errors) {
      this.nameError = errors.nameError;
      this.emailError = errors.emailError;
      this.passwordError = errors.passwordError;
      this.repeatedPasswordError = errors.repeatedPasswordError;
    },
    _removeErrors() {
      this.nameError = false;
      this.emailError = false;
      this.passwordError = false;
      this.repeatedPasswordError = false;
    },
    signUp() {
      this._removeErrors();
      this.signingUp = true;
      let newUserInput = {
        name: this.name,
        email: this.email,
        password: this.password,
        repeatedPassword: this.repeatedPassword
      };
      service.signUp(newUserInput).then(r => {
        this.signingUp = false;
        this._setErrors(r.formErrors);
        if (r.success) {
          showModal(this, "signUpSuccessTitle", "signUpSuccessMessage");
          this.$router.replace(routes.signIn);
        } else {
          showErrorModal(this, r.requestErrors);
        }
      });
    },
    goToSignIn() {
      this.$router.replace(routes.signIn);
    }
  }
};
</script>