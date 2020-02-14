<template>
  <div class="centered-container">
    <label for="file-upload" class="button-like">{{$t("change")}}</label>
    <input v-on:change="loadImage" id="file-upload" type="file" accept="image/*" />
    <p v-if="newImagePath">{{$t("clickImageToChange")}}</p>
    <img v-bind:src="imagePath" class="profile" v-on:click="uploadImage" />
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
      email: "",
      newPassword: "",
      repeatNewPassword: ""
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

.button-like {
  width: 25%;
  text-align: center;
}
</style>