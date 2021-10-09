<template>
  <div>
    <div>ダッシュボード 画面</div>
    <p>{{ user }} さん、こんにちわ！！</p>

    <a href="/">top</a>
    <a @click="logout" href="/">ログアウト</a>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "dashboardPage",

  data() {
    return {
      hoge: "ほげ",
      user: "",
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
        this.user = res.data;
      }
    });
  },
});
</script>
