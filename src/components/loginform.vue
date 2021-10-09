<template>
  <v-container>
    <v-row class="text-center">
      <v-form>
        <v-container>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="name"
                :counter="10"
                label="Name"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-model="password"
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
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Loginform",

  data: () => ({
    name: "",
    password: "",
    message: "",
  }),
  methods: {
    login() {
      if ((this.name || this.password) === "") {
        alert("入力してください");
        (this.name = ""), (this.password = "");
      } else {
        this.axios
          .post("/", {
            //formの値を格納
            name: this.name,
            password: this.password,
          })
          .then((res) => {
            // console.log(res);
            // console.log(res.data[0].name + "さんは登録されています");
            this.message = res.data.message;
            this.$router.push("/dashboard");
          })
          .catch((err) => {
            console.log(err);
          });
        (this.name = ""), (this.password = "");
      }
    },
  },
});
</script>
