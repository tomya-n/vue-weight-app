<template>
  <div>
    <div>データ入力画面</div>

    <a href="/">top</a>
    <a href="/dashboard">DASHBOARD</a>
    <a @click="logout" href="/">ログアウト</a>
    <div class="wrap">
      <div class="inner">
        <v-row align="center">
          <v-date-picker
            v-model="date"
            width="290"
            class="mt-4"
          ></v-date-picker>
        </v-row>
        <v-col cols="12" md="12">
          <v-form ref="form">
            <v-text-field
              v-model="height"
              label="身長を入力してください"
            ></v-text-field>
          </v-form>
        </v-col>
        <v-col cols="12" md="12">
          <v-form ref="form">
            <v-text-field
              v-model="weight"
              label="体重を入力してください"
            ></v-text-field>
          </v-form>
        </v-col>
        <v-btn elevation="2" @click="dataRegist">データ登録</v-btn>
      </div>
    </div>
  </div>
</template>

<style>
.wrap {
  display: flex;
  justify-content: center;
}
.row {
  margin: auto;
}
</style>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "entrypage",

  data() {
    return {
      username: "",
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      weight: undefined,
      height: undefined,
    };
  },
  methods: {
    logout() {
      this.axios.get("/logout").then((res) => {
        console.log(res);
        this.$router.push("/");
      });
    },
    dataRegist() {
      // console.log(this.date);
      // console.log(this.weight);
      // console.log(this.height);
      this.axios.post("/dashboard", {
        date: this.date,
        weight: this.weight,
        height: this.height,
      });
      this.$router.push("/dashboard");
    },
  },
});
</script>
