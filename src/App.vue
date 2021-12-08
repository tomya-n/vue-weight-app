<template>
  <v-app>
    <div class="headbar">WeightApp</div>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<style>
.headbar {
  text-align: center;
  padding: 20px 0;
  background: #acd8e6;
  font-weight: bolder;
  color: #fff;
  box-shadow: 2px 2px 6px #acd8e6;
}
</style>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",

  data: () => ({
    //
  }),
});
</script>
