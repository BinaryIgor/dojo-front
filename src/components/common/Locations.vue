<template>
    <div class="centered-container">
    <div class="locations-title">
      <img v-on:click="goBack" class="icon" src="/back_arrow_black.png" />
      <h1>{{$t('locations')}}</h1>
    </div>
    <div class="locations">
      <div
        class="location"
        v-bind:class="{selected: l.selected}"
        v-for="(l, index) in locations"
        @click="toggleLocationState(l, index)"
        v-bind:key="index"
      >{{l.name}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import SelectableLocation from "../../core/model/selectable-location";
import { locationsServiceProvider as serviceProvider } from "../../App.vue";
import { showErrorModal } from "./modals";
import { FilterCategory } from "../../core/model/filter-category";
import LocationsService from "../../core/service/locations-service";

@Component
export default class Location extends Vue {
  locations: SelectableLocation[] = [];

  @Prop({default: FilterCategory.TASKS})
  readonly locationsCategory!: FilterCategory;

  created() {
    this.service().getLocations().then(r => {
      if (r.success) {
        this.locations = r.value;
      } else {
        showErrorModal(this, r.exceptions);
      }
    });
  }

  service(): LocationsService {
    return serviceProvider.provide(this.locationsCategory);
  }

  goBack(): void {
    //TODO is there better way to go back?
    this.$router.go(-1);
  }

  toggleLocationState(location: SelectableLocation, idx: number): void {
    this.service().toggleLocation(location.name);
    const currentLocation = this.locations[idx];
    currentLocation.selected =!currentLocation.selected;
  }
}
</script>

<style scoped>
.locations-title {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  width: 100%;
  height: 100%;
  align-items: center;
}
.selected {
  background-color: var(--primary-light);
}
</style>