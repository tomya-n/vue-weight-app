<template>
  <form>
    <h2 class="title">Login</h2>
    <v-text-field
      v-model="loginData.username"
      :counter="10"
      label="Name"
    ></v-text-field>
    <v-text-field
      v-model="loginData.password"
      label="E-mail"
    ></v-text-field>

    <v-btn
      class="mr-4"
      @click="login"
    >
      ログイン
    </v-btn>
    <v-btn @click="clear">
      クリア
    </v-btn>
  </form>
</template>

<style lang="scss">
  form{
    width: 30%;
    margin: 8% auto 0;
    padding: 2.5% 5% 5%;
    box-shadow: 0px 2px 10px rgb(175, 175, 175);
    .title{
      text-align: center;
    }
  }
</style>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Loginform",

  data: () => ({
    loginData: {
      username: "",
      password: "",
    },
  }),
  methods: {
    login() {
      this.$store.dispatch("save", this.loginData);
      if ((this.loginData.username === "" || this.loginData.password) === "") {
        alert("入力してください");
        (this.loginData.username = ""), (this.loginData.password = "");
      } else {
        this.axios
          .post("/", {
            //formの値を格納
            name: this.loginData.username,
            password: this.loginData.password,
          })
          .then(() => {
            this.$router.push("/dashboard/");
          })
          .catch((err) => {
            console.log(err);
          });
        (this.loginData.username = ""), (this.loginData.password = "");
      }
    },
    clear() {
      this.loginData.username = "",
      this.loginData.password = ""
    }
  },
});
</script>
