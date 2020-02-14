<template>
  <div class="centered-container">
    <label for="file-upload" class="button-like">{{$t("change")}}</label>
    <input v-on:change="loadImage" id="file-upload" type="file" accept="image/*" />
    <p v-if="newImagePath">{{$t("clickImageToChange")}}</p>
    <img v-bind:src="imagePath" class="profile" v-on:click="uploadImage" />
    <h2>{{name}}</h2>
    <p class="error" v-if="nameError">{{$t('badName')}}</p>
    <input v-if="editName" v-bind:placeholder="$t('newName')" />
    <button v-on:click="changeName">{{$t("change")}}</button>
    <h2>{{email}}</h2>
    <p class="error" v-if="emailError">{{$t('badEmail')}}</p>
    <input type="email" v-if="editEmail" v-bind:placeholder="$t('newEmail')" />
    <button v-on:click="changeEmail">{{$t("change")}}</button>
    <button v-on:click="toggleEditPassword">{{$t("password")}}</button>
    <form v-if="editPassword">
      <p>{{$t('oldPassword')}}</p>
      <p class="error" v-if="oldPasswordError">{{$t('badPassword')}}</p>
      <input type="password" v-model="oldPassword" />
      <p>{{$t('newPassword')}}</p>
      <p class="error" v-if="newPasswordError">{{$t('badPassword')}}</p>
      <input type="password" v-model="newPassword" />
      <p>{{$t('repeatNewPassword')}}</p>
      <p class="error" v-if="repeatedNewPasswordError">{{$t('badRepeatedPassword')}}</p>
      <input type="password" v-model="repeatedNewPassword" />
    </form>
    <button v-if="editPassword" v-on:click="changePassword">{{$t('change')}}</button>
  </div>
</template>

<script>
export default {
  name: "EditProfile",
  data() {
    return {
      imagePath: "",
      newImagePath: "",
      name: "",
      nameError: false,
      editName: false,
      email: "",
      emailError: false,
      editEmail: false,
      oldPassword: "",
      oldPasswordError: false,
      newPassword: "",
      newPasswordError: false,
      repeatedNewPassword: "",
      repeatedNewPasswordError: false,
      editPassword: false
    };
  },
  methods: {
    loadImage(e) {
      let uploaded = e.target.files[0];
      this.newImagePath = URL.createObjectURL(uploaded);
      this.imagePath = this.newImagePath;
    },
    uploadImage() {
      console.log("Should upload image...", this.newImagePath);
    },
    changeName() {
      this.editName = !this.editName;
    },
    changeEmail() {
      this.editEmail = !this.editEmail;
    },
    toggleEditPassword() {
      this.editPassword = !this.editPassword;
    },
    changePassword() {},
    loadProfile() {}
  }
};
</script>

<style scoped>
input[type="file"] {
  display: none;
}
/*TODO why this is needed?*/
label {
  display: block;
}

button,
.button-like {
  width: 25%;
  text-align: center;
}
</style>