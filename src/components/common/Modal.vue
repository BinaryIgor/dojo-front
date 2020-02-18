<template>
  <div class="modal-mask" v-bind:class="{ hidden: !show}" v-on:click="hide">
    <div class="modal">
      <h1>{{ title }}</h1>
      <p v-for="(t, index) in texts" v-bind:key="index">{{t}}</p>
      <button>{{$t('ok')}}</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { ModalMessage } from "./modal-message";
import Component from 'vue-class-component'

@Component
export default class Modal extends Vue {
  title = "";
  texts: Array<string> = [];
  show = false;

  hide(): void {
    this.show = false;
  }

  created(): void {
    this.$parent.$on("show", (m: ModalMessage) => {
      this.title = m.title;
      this.texts = m.texts;
      this.show = true;
    });
  }
}
</script>

<style scoped>
button {
  width: 90%;
  margin-bottom: var(--padding-small);
}
</style>