<template>
  <div class="modal-mask" v-bind:class="{ hidden: !show}" v-on:click="hide">
    <div class="modal">
      <h1>{{ title }}</h1>
      <p v-for="(t, index) in texts" v-bind:key="index">{{t}}</p>
      <button>{{$t('ok')}}</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      texts: [],
      show: false
    };
  },
  methods: {
    hide() {
      this.show = false;
    }
  },
  created() {
    this.$parent.$on("show", d => {
      this.title = d.title;
      this.texts = d.texts;
      this.show = true;
    });
  }
};
</script>

<style scoped>
button {
  width: 90%;
  margin-bottom: var(--padding-small);
}
</style>