<template>
  <div>
    <div>ダッシュボード 画面</div>
    <p>{{ username }} さん、こんにちわ！！</p>

    <div class="chart-wrapper">
      <Chart v-if="loaded" :chartData="chartItems" :options="chartOptions" />
    </div>
    <a href="/">top</a>
    <a href="/entry">entry</a>
    <a @click="logout">ログアウト</a>
  </div>
</template>

<style>
  .chart-wrapper{
    width: 50%;
  }
</style>

<script>
import Vue from "vue";
import Chart from "@/components/CHART.js";

export default Vue.extend({
  name: "dashboardPage",
  components: {
    Chart,
  },
  data() {
    return {
      chartItems: {
        labels: [],
        datasets: [
          {
            label: "体重経過",
            data: [],
            backgroundColor: "lightblue",
          },
        ],
      },
      chartOptions: {
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              display: true,
              // X軸グリッド非表示
              gridLines: {
                display: false,
              },
            },
          ],
          // Y軸
          yAxes: [
            {
              display: true,
              position: "right",
              ticks: {
                // 最大目盛
                maxTicksLimit: 10,
              },
            },
          ],
        },
      },
      username: "",
      loaded: false,
    };
  },
  mounted() {
    this.output();
  },
  methods: {
    logout() {
      this.axios.get("/logout").then(() => {
        sessionStorage.removeItem("vue-weight-app");
        this.$router.push("/");
      });
    },
    output() {
      this.axios.get("/dashboard").then((res) => {
        //weightData
        this.chartItems.datasets[0].data = res.data.physical.map(function (
          val,
          index,
          arr
        ) {
          return arr[index].weight;
        });
        //createdAt
        this.chartItems.labels = res.data.physical.map(function (
          val,
          index,
          arr
        ) {
          return val.created_at.substr(0,10);
          // return arr[index].created_at;
        });
        this.loaded = true;
      });
    },
  },
  created() {
    this.axios.get("/dashboard").then((res) => {
      if (res.data.username === undefined) {
        this.$router.push("/");
      } else {
        this.username = res.data.username;
      }
    });
  },
});
</script>
