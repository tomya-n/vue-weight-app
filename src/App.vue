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
  background: rgb(28, 171, 253);
  font-weight: bolder;
  color: #fff;
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
