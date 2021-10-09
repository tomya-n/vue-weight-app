<template>
  <div>
    <signup />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Signup from "@/components/signup.vue";

export default Vue.extend({
  name: "Signuppage",

  components: {
    Signup,
  },
});
</script>
