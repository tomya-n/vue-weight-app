<template>
  <div>
    <div>データ入力画面</div>

    <a href="/">top</a>
    <a href="/dashboard">DASHBOARD</a>
    <a @click="logout" href="/">ログアウト</a>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "entrypage",

  data() {
    return {
      username: "",
    };
  },
  methods: {
    logout() {
      this.axios.get("/logout").then((res) => {
        console.log(res);
        this.$router.push("/");
      });
    },
  },
});
</script>
