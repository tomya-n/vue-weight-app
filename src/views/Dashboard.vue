<template>
  <div>
    <div>ダッシュボード 画面</div>
    <p>{{ username }} さん、こんにちわ！！</p>

    <a href="/">top</a>
    <a href="/entry">entry</a>
    <a @click="logout" href="/">ログアウト</a>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "dashboardPage",

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
  created() {
    this.axios.get("/dashboard").then((res) => {
      if (res.data === "") {
        this.$router.push("/");
      } else {
        console.log(res.data);
        this.username = res.data;
      }
    });
  },
});
</script>
