<template>
  <div>
    <div>ダッシュボード 画面</div>
    <p>{{ username }} さん、こんにちわ！！</p>

    <ul>
      <li v-for="physical in physical_data" :key="physical.id">
        {{ physical.weight }}kg
        {{ physical.height }}cm
      </li>
    </ul>

    <a href="/">top</a>
    <a href="/entry">entry</a>
    <a @click="logout">ログアウト</a>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "dashboardPage",

  data() {
    return {
      username: "",
      physical_data: {
        weight: "",
        height: "",
      },
    };
  },
  methods: {
    logout() {
      this.axios.get("/logout").then(() => {
        sessionStorage.removeItem("vue-weight-app");
        this.$router.push("/");
      });
    },
  },
  created() {
      this.axios.get("/dashboard").then((res) => {
      if (res.data === "") {
        this.$router.push("/");
      } else {
        this.username = res.data.username;
        this.physical_data = res.data.physical;
      }
    })
  },
});
</script>
