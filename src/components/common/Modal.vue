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
.modal-mask {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
}
.hidden {
  display: none;
}
.modal {
  width: 50%;
  background-color: white;
  padding: var(--pading-large);
}
button {
  width: 90%;
  margin-bottom: var(--padding-small);
}
</style>