<template>
  <div>
    <h1>{{ $t('signingIn') }}</h1>
    <form>
      <p>{{$t('nameOrEmail')}}</p>
      <p class="error" v-if="nameError">{{$t('nonExistentName')}}</p>
      <p class="error" v-if="emailError">{{$t('nonExistentEmail')}}</p>
      <input type="text" v-model="nameOrEmail" />
      <p>{{$t('password')}}</p>
      <p class="error" v-if="passwordError">{{$t('wrongPassword')}}</p>
      <input type="password" v-model="password" />
    </form>
    <button v-on:click="signIn">{{$t('signIn')}}</button>
  </div>
</template>

<script>
export default {
  name: "SignIn",
  data() {
    return {
      nameOrEmail: "",
      nameError: false,
      emailError: false,
      password: "",
      passwordError: false
    };
  },
  methods: {
    signIn() {}
  }
};
</script>