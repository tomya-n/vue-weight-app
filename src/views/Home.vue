<template>
  <div>
    <router-link to="/signup">登録はこちら</router-link>
    <!-- <router-link to="/dashboard">ダッシュボードはこちら</router-link> -->
    <loginform />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Loginform from "@/components/LOGINFORM.vue";

export default Vue.extend({
  name: "HOME",

  components: {
    Loginform,
  },
});
</script>
