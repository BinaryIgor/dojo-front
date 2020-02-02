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
  </div>
</template>

<script>
import { signInService as service } from "../App.vue";
import { showErrorModal } from "./common/modals.js";

export default {
  name: "SignIn",
  data() {
    return {
      nameOrEmail: "",
      nameError: false,
      emailError: false,
      password: "",
      passwordError: false,
      signingIn: false
    };
  },
  methods: {
    _setErrors(errors) {
      this.nameError = errors.nameError;
      this.emailError = errors.emailError;
      this.passwordError = errors.passwordError;
    },
    _removeErrors() {
      this.nameError = false;
      this.emailError = false;
      this.passwordError = false;
    },
    signIn() {
      this._removeErrors();
      this.signingIn = true;
      service.signIn({
          nameOrEmail: this.nameOrEmail,
          password: this.password
      }).then(r => {
          this.signingIn = false;
          this._setErrors(r.formErrors);
          if (r.success) {
              //TODO go to home page
          } else {
              showErrorModal(this, r.requestErrors);
          }
      });
    }
  }
};
</script>