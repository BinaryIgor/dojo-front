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

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { editProfileService as service } from "../App.vue";
import {
  showErrorModal,
  showModal,
  showConfirmationModal,
  registerConfirmationModalListener
} from "../components/common/modals";
import UserProfile from "../core/model/user-profile";
import UserProfileUpdateInput from "../core/model/input/user-profile-update-input";
import UserProfileUpdateInputErrors from "../core/error/user-profile-update-input-errors";
import PasswordUpdateInput from "../core/model/input/password-update-input";
import PasswordUpdateInputErrors from "../core/error/password-update-input-errors";

@Component
export default class EditProfile extends Vue {
  previousImagePath = "";
  imagePath = "";
  uploadedImage: File | null = null;
  name = "";
  newName = "";
  newNameError = false;
  email = "";
  newEmail = "";
  newEmailError = false;
  editProfile = false;
  oldPassword = "";
  oldPasswordError = false;
  newPassword = "";
  newPasswordError = false;
  repeatedNewPassword = "";
  repeatedNewPasswordError = false;
  editPassword = false;
  passwordUpdate = false;

  created(): void {
    this.getProfile();
    registerConfirmationModalListener(this, (conf: boolean) => {
      if (this.passwordUpdate) {
        this.updatePasswordOnConfirmation(conf);
      } else {
        this.updateProfileOnConfirmation(conf);
      }
    });
  }

  getProfile(): void {
    service.getProfile().then(r => {
      if (r.success) {
        this.onGetProfileSuccess(r.value);
      } else {
        showErrorModal(this, r.exceptions);
      }
    });
  }

  onGetProfileSuccess(profile: UserProfile): void {
    this.name = profile.name;
    this.email = profile.email;
    this.imagePath = profile.imagePath;
  } 

  loadImage(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.uploadedImage = target.files ? target.files[0] : null;
    if (this.uploadedImage) {
      this.previousImagePath = this.imagePath;
      this.imagePath = URL.createObjectURL(this.uploadedImage);
    }
  }

  cancelImageUpload(): void {
    this.uploadedImage = null;
    this.imagePath = this.previousImagePath;
  }

  uploadImage() {
    if (!this.uploadedImage) {
      showModal(this, "uploadFileFirst");
      return;
    }
    service.uploadProfileImage(this.uploadedImage as File).then(r => {
      if (r.success) {
        this.uploadedImage = null;
      } else {
        showErrorModal(this, r.exceptions);
      }
    });
  }

  toggleEditProfile(): void {
    if (this.editProfile) {
      this.clearProfileInputs();
    }
    this.editProfile = !this.editProfile;
  }

  clearProfileInputs(): void {
    this.newName = this.newEmail = "";
    this.newNameError = this.newEmailError = false;
  }

  toggleEditPassword(): void {
    this.editPassword = !this.editPassword;
  }

  updateProfile(): void {
    const update = this.collectProfileUpdate();
    if (service.shouldUpdateProfile(update)) {
      this.passwordUpdate = false;
      this.showConfirmationModal();
    } else {
      showModal(this, "noChangesToSave");
    }
  }

  collectProfileUpdate(): UserProfileUpdateInput {
    return new UserProfileUpdateInput(
      this.newName,
      this.name,
      this.newEmail,
      this.email
    );
  }

  showConfirmationModal(): void {
    showConfirmationModal(this, "changesConfirmation");
  }

  updateProfileOnConfirmation(confirmed: boolean): void {
    if (!confirmed) {
      return;
    }
    const profileUpdate = this.collectProfileUpdate();
    service.updateProfile(profileUpdate).then(r => {
      if (r.success) {
        this.onProfileUpdateSuccess(r.value);
      } else {
        this.onProfileUpdateFailure(r.inputErrors, r.requestErrors);
      }
    });
  }

  onProfileUpdateSuccess(profile: UserProfile): void {
    this.name = profile.name;
    this.email = profile.email;
    this.clearProfileInputs();
    this.editProfile = false;
  }

  onProfileUpdateFailure(
    inputErrors: UserProfileUpdateInputErrors,
    requestErrors: string[]
  ): void {
    this.newNameError = inputErrors.newName;
    this.newEmailError = inputErrors.newEmail;
    showErrorModal(this, requestErrors);
  }

  updatePassword(): void {
    this.passwordUpdate = true;
    this.showConfirmationModal();
  }

  updatePasswordOnConfirmation(confirmed: boolean): void {
    if (!confirmed) {
      return;
    }
    const passwordUpdate = this.collectPasswordUpdate();
    service.updatePassword(passwordUpdate).then(r => {
      if (r.success) {
        this.onPasswordUpdateSuccess();    
      } else {
        this.onPasswordUpdateFailure(r.inputErrors, r.requestErrors);
      }
    });
  }

  collectPasswordUpdate(): PasswordUpdateInput {
    return new PasswordUpdateInput(this.oldPassword, this.newPassword, this.repeatedNewPassword);
  }

  onPasswordUpdateSuccess(): void {
    this.oldPassword = this.newPassword = this.repeatedNewPassword = "";
    this.oldPasswordError = this.newPasswordError = this.repeatedNewPasswordError = false;
    this.editPassword = false;
  }

  onPasswordUpdateFailure(inputErrors: PasswordUpdateInputErrors, requestErrors: string[]): void {
    this.oldPasswordError = inputErrors.oldPassword;
    this.newPasswordError = inputErrors.newPassword;
    this.repeatedNewPasswordError = inputErrors.repeatedNewPassword;
    showErrorModal(this, requestErrors);
  }
}
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