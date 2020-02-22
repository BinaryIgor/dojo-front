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

<script lang="ts">
import Vue from "vue";
//TODO: fix modals html,css and js code duplication
import {
  SHOW_CONFIRMATION_MODAL_EVENT,
  HIDE_CONFIRMATION_MODAL_EVENT
} from "./modals.js";
import Component from "vue-class-component";
import ConfirmationModalMessage from "./confirmation-modal-message";

@Component
export default class ConfirmationModal extends Vue {
  title = "";
  text = "";
  confirmed = false;
  show = false;

  hide(): void {
    this.show = false;
    this.$parent.$emit(HIDE_CONFIRMATION_MODAL_EVENT, this.confirmed);
    this.confirmed = false;
  }

  confirm(): void {
    this.confirmed = false;
  }

  created(): void {
    this.$parent.$on(
      SHOW_CONFIRMATION_MODAL_EVENT,
      (m: ConfirmationModalMessage) => {
        this.$t
        this.title = m.title;
        this.text = m.text;
        this.show = true;
      }
    );
  }
}
</script>

<style scoped>
button {
  width: 40%;
  margin-bottom: var(--padding-small);
}
</style>