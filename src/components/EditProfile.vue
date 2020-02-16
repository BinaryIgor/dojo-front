<template>
  <div class="centered-container body">
    <img v-bind:src="imagePath" class="profile" />
    <button v-if="uploadedImage" v-on:click="cancelImageUpload">{{$t("cancel")}}</button>
    <button v-if="uploadedImage" v-on:click="uploadImage">{{$t("change")}}</button>
    <label for="file-upload" class="button-like">{{$t("icon")}}</label>
    <input v-on:change="loadImage" id="file-upload" type="file" accept="image/*" />
    <h2>{{name}}</h2>
    <h2>{{email}}</h2>
    <p class="error" v-if="newNameError">{{$t('badName')}}</p>
    <input v-if="editProfile" v-bind:placeholder="$t('newName')" v-model="newName" />
    <p class="error" v-if="newEmailError">{{$t('badEmail')}}</p>
    <input type="email" v-if="editProfile" v-bind:placeholder="$t('newEmail')" v-model="newEmail" />
    <button v-if="editProfile" v-on:click="updateProfile">{{$t("change")}}</button>
    <button v-on:click="toggleEditProfile">{{$t("profile")}}</button>
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
    <button v-if="editPassword" v-on:click="updatePassword">{{$t('change')}}</button>
    <button v-on:click="toggleEditPassword">{{$t("password")}}</button>
    <confirmation-modal></confirmation-modal>
  </div>
</template>

<script>
import { editProfileService as service } from "../App.vue";
import {
  showErrorModal,
  showModal,
  showConfirmationModal,
  registerConfirmationModalListener
} from "../components/common/modals.js";

export default {
  name: "EditProfile",
  created() {
    registerConfirmationModalListener(this, conf => {
      if (this.passwordUpdate) {
        this.updatePasswordOnConfirmation(conf);
      } else {
        this.updateProfileOnConfirmation(conf);
      }
    });
    this.getProfile();
  },
  data() {
    return {
      previousImagePath: "",
      imagePath: "",
      uploadedImage: null,
      name: "",
      newName: "",
      newNameError: false,
      email: "",
      newEmail: "",
      newEmailError: false,
      editProfile: false,
      oldPassword: "",
      oldPasswordError: false,
      newPassword: "",
      newPasswordError: false,
      repeatedNewPassword: "",
      repeatedNewPasswordError: false,
      editPassword: false,
      passwordUpdate: false
    };
  },
  methods: {
    getProfile() {
      service.getCurrentUserProfile().then(r => {
        if (r.success) {
          let profile = r.value;
          this.name = profile.name;
          this.email = profile.email;
          this.imagePath = profile.imagePath
            ? profile.imagePath
            : "placeholder.jpg";
        } else {
          showErrorModal(this, r.exceptions);
        }
      });
    },
    loadImage(e) {
      this.uploadedImage = e.target.files[0];
      if (this.uploadedImage) {
        this.previousImagePath = this.imagePath;
        this.imagePath = URL.createObjectURL(this.uploadedImage);
      }
    },
    cancelImageUpload() {
      this.uploadedImage = null;
      this.imagePath = this.previousImagePath;
    },
    uploadImage() {
      service.uploadProfileImage(this.uploadedImage).then(r => {
        if (r.success) {
          this.uploadedImage = null;
        } else {
          showErrorModal(this, r.exceptions);
        }
      });
    },
    toggleEditProfile() {
      if (this.editProfile) {
        this.clearProfileInputs();
      }
      this.editProfile = !this.editProfile;
    },
    toggleEditPassword() {
      this.editPassword = !this.editPassword;
    },
    updateProfile() {
      if (
        !service.shouldUpdateProfile(
          this.name,
          this.newName,
          this.email,
          this.newEmail
        )
      ) {
        showModal(this, "noChangesToSave");
      } else {
        this.updatePassword = false;
        this.showConfirmationModal();
      }
    },
    showConfirmationModal() {
      showConfirmationModal(this, "changesConfirmation");
    },
    updateProfileOnConfirmation(confirmed) {
      if (!confirmed) {
        return;
      }
      let profileUpdate = {
        newName: this.newName,
        newEmail: this.newEmail
      };
      let previousProfile = {
        name: this.name,
        email: this.email
      };
      service.updateProfile(profileUpdate, previousProfile).then(r => {
        if (r.success) {
          this.profileUpdateSuccess(r.value);
        } else {
          this.setProfileErrors(r.inputErrors);
          showErrorModal(this, r.requestErrors);
        }
      });
    },
    setProfileErrors(errors) {
      this.newNameError = errors.newNameError;
      this.newEmailError = errors.newEmailError;
    },
    clearProfileInputs() {
      this.newName = this.newEmail = "";
      this.newNameError = this.newEmailError = false;
    },
    profileUpdateSuccess(updatedProfile) {
      this.name = updatedProfile.name;
      this.email = updatedProfile.email;
      this.clearProfileInputs();
      this.editProfile = false;
    },
    updatePassword() {
      this.passwordUpdate = true;
      this.showConfirmationModal();
    },
    updatePasswordOnConfirmation(confirmed) {
      if (!confirmed) {
        return;
      }
      let passwordUdateInput = {
        oldPassword: this.oldPassword,
        newPassword: this.newPassword,
        repeatedNewPassword: this.repeatedNewPassword
      };
      service.updatePassword(passwordUdateInput).then(r => {
        if (r.success) {
          this.passwordUpdateSuccess();
        } else {
          this.setPasswordErrors(r.inputErrors);
          showErrorModal(this, r.requestErrors);
        }
      });
    },
    setPasswordErrors(errors) {
      this.oldPasswordError = errors.oldPasswordError;
      this.newPasswordError = errors.newPasswordError;
      this.repeatedNewPasswordError = errors.repeatedNewPasswordError;
    },
    clearPasswordInputs() {
      this.oldPassword = this.newPassword = this.repeatedNewPassword = "";
      this.oldPasswordError = this.newPasswordError = this.repeatedNewPasswordError = false;
    },
    passwordUpdateSuccess() {
      this.clearPasswordInputs();
      this.editPassword = false;
    }
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