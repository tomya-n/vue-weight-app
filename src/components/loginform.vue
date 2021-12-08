<template>
  <form>
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
  <!-- <v-container>
    <v-row class="text-center">
      <v-form>
        <v-container>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="loginData.username"
                :counter="10"
                label="Name"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-model="loginData.password"
                :counter="10"
                label="Password"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <v-btn @click="login" elevation="2"> ログイン </v-btn>
      </v-form>
    </v-row>
  </v-container> -->
</template>

<style lang="css">
  form{
    width: 30%;
    margin: 0 auto;
    padding: 0 30px;
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
