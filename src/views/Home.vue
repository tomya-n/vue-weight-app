<template>
  <div>
    <router-link to="/signup">登録はこちら</router-link>
    <router-link to="/dashboard">ダッシュボードはこちら</router-link>
    <loginform />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Loginform from "@/components/loginform.vue";

export default Vue.extend({
  name: "Home",

  components: {
    Loginform,
  },
});
</script>
