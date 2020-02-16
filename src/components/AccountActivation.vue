<template>
  <h1>{{$t('accountActivationTitle')}}</h1>
</template>

<script>
import { accountActivationService as service } from "../App.vue";
import { routes } from "../routes.js";
import { showErrorModal, showModal } from "./common/modals.js";

export default {
  name: "AccountActivation",
  mounted() {
    service.activateAccount(this.$route.params.token).then(r => {
      if (r.success) {
        showModal(this, "accountActivatedTitle", "accountActivatedMessage");
      } else {
        showErrorModal(this, r.exceptions);
      }
      this.$router.replace(routes.signIn);
    });
  }
};
</script>

