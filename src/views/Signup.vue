<template>
  <div>
    <h2>ユーザー登録</h2>
    <v-container>
      <v-row class="text-center">
        <v-form>
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="name"
                  :counter="10"
                  label="Name"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="password"
                  :counter="10"
                  label="Password"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <v-btn @click="signup" elevation="2"> 登録 </v-btn>
        </v-form>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Signup",

  data: () => ({
    name: "",
    password: "",
  }),
  methods: {
    signup() {
      if ((this.name || this.password) === "") {
        alert("入力してください");
        (this.name = ""), (this.password = "");
      } else {
        this.axios
          .post("/signup", {
            //formの値を格納
            name: this.name,
            password: this.password,
          })
          .then((res) => {
            console.log(res);
            console.log("登録されました！");
            this.$router.push("/dashboard");
          })
          .catch((err) => {
            console.log(err);
          });
        this.name = "";
        this.password = "";
      }
    },
  },
});
</script>
