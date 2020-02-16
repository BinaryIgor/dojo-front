<template>
  <div class="modal-mask" v-bind:class="{ hidden: !show}" v-on:click="hide">
    <div class="modal">
      <h1>{{title}}</h1>
      <p>{{text}}</p>
      <button>{{$t('cancel')}}</button>
      <button v-on:click="confirm">{{$t('ok')}}</button>
    </div>
  </div>
</template>

<script>
//TODO: fix modals html,css and js code duplication
import {SHOW_CONFIRMATION_MODAL_EVENT, HIDE_CONFIRMATION_MODAL_EVENT} from "./modals.js";
export default {
  data() {
    return {
      title: "",
      text: "",
      confirmed: false,
      show: false
    };
  },
  methods: {
    hide() {
      this.show = false;
      this.$parent.$emit(HIDE_CONFIRMATION_MODAL_EVENT, this.confirmed);
      this.confirmed = false;
    },
    confirm() {
      this.confirmed = true;
    }
  },
  created() {
    this.$parent.$on(SHOW_CONFIRMATION_MODAL_EVENT, d => {
      this.title = d.title;
      this.texts = d.text;
      this.show = true;
    });
  }
};
</script>

<style scoped>
button {
  width: 40%;
  margin-bottom: var(--padding-small);
}
</style>