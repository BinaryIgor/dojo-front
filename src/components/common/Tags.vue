<template>
  <div class="centered-container">
    <div class="tags-title">
      <img v-on:click="goBack" class="icon" src="/back_arrow_black.png" />
      <h1>{{$t('tags')}}</h1>
    </div>
    <div class="tags">
      <div
        class="tag"
        v-bind:class="{unselected: !t.selected}"
        v-for="(t, index) in tags"
        @click="toggleTagState(t, index)"
        v-bind:key="index"
      >#{{t.name}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import SelectableTag from "../../core/model/selectable-tag";
import { tagsServiceProvider as serviceProvider } from "../../App.vue";
import { showErrorModal } from "./modals";
import { FilterCategory } from "../../core/model/filter-category";
import TagsService from "../../core/service/tags-service";

@Component
export default class Tags extends Vue {
  tags: SelectableTag[] = [];

  @Prop({ default: FilterCategory.TASKS })
  readonly tagsCategory!: FilterCategory;

  created() {
    this.service()
      .getTags()
      .then(r => {
        if (r.success) {
          this.tags = r.value;
        } else {
          showErrorModal(this, r.exceptions);
        }
      });
  }

  service(): TagsService {
    return serviceProvider.provide(this.tagsCategory);
  }

  goBack(): void {
    //TODO is there better way to go back?
    this.$router.go(-1);
  }

  toggleTagState(tag: SelectableTag, idx: number): void {
    this.service().toggleTag(tag.name);
    const currentTag = this.tags[idx];
    currentTag.selected = !currentTag.selected;
  }
}
</script>

<style scoped>
/*Combat tags/locations code duplication if needed*/
.tags-title {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  width: 100%;
  height: 100%;
  align-items: center;
}
.unselected {
  background-color: var(--primary-dark);
}
</style>