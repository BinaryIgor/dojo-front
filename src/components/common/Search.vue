<template>
  <div class="left-container">
    <input
      v-if="searchCategory == 0"
      type="text"
      v-model="title"
      v-bind:placeholder="$t('searchTaskHint')"
    />
    <input v-else type="text" v-model="title" v-bind:placeholder="$t('searchDoerHint')" />
    <div class="tags">
      <button v-on:click="chooseTags">{{$t('tags')}}</button>
      <div class="tag" v-for="(t, index) in tags" v-bind:key="index">#{{t}}</div>
    </div>
    <div class="locations">
      <button class="location" v-on:click="chooseLocations">{{$t('location')}}</button>
      <div class="location" v-for="(l, index) in locations" v-bind:key="index">{{l}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { searchFilterServiceProvider as serviceProvider } from "../../App.vue";
import SearchFilterService from "../../core/service/search-filter-service";
import { FilterCategory } from "../../core/model/filter-category";
import { showModal } from "./modals";

@Component
export default class Search extends Vue {
  title = "";
  tags: string[] = [];
  locations: string[] = [];
  setSearchCategory = FilterCategory.TASKS;

  @Prop({ default: FilterCategory.TASKS })
  searchCategory?: FilterCategory;

  created(): void {
    this.setSearchCategory = this.searchCategory || this.setSearchCategory;
    const filter = this.service().getFilters();
    this.title = filter.title;
    this.tags = filter.tags;
    this.locations = filter.locations;
  }

  service(): SearchFilterService {
    return serviceProvider.provide(this.setSearchCategory);
  }

  chooseTags(): void {
    this.$router.push(this.service().routes.tagsRoute);
  }

  chooseLocations(): void {
    this.$router.push(this.service().routes.locationsRoute);
  }
}
</script>

<style scoped>
input,
.tags {
  margin-bottom: var(--padding-medium);
}
input {
  padding: var(--padding-medium);
}
</style>