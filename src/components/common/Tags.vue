<template>
  <div class="centered-container">
    <div class="tags-title">
      <img v-on:click="goBack" class="icon" src="/back_arrow_black.png" />
      <h1>{{$t('tags')}}</h1>
    </div>
    <div class="tags">
      <div
        class="tag"
        v-bind:class="{selected: t.selected}"
        v-for="(t, index) in tags"
        @click="toggleTagState(index)"
        v-bind:key="index"
      >#{{t.name}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import SelectableTag from "../../core/model/selectable-tag";

@Component
export default class Tags extends Vue {
  tags: SelectableTag[] = [
    new SelectableTag("Remont", false),
    new SelectableTag("Rozrywka", false),
    new SelectableTag("Matematyka", false),
    new SelectableTag("Wyzwanie", false)
  ];

  goBack(): void {
    //TODO is there better way to go back?
    this.$router.go(-1);
  }

  toggleTagState(idx: number): void {
    const tag = this.tags[idx];
    tag.selected = !tag.selected;
  }
}
</script>

<style scoped>
.tags-title {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  width: 100%;
  height: 100%;
  align-items: center;
}
.selected {
  background-color: var(--primary-dark);
}
</style>