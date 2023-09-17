<template>
  <div class="w-9/12 flex">
  <Bar
      id="bar-chart"
      :options="this.chartOptions"
      :data="this.data"
  />
  </div>

</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js'
import {getCookie, HOST} from "@/utils";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement)

export default {
  name: 'bar-chart',
  components: { Bar },
  methods: {
    generateLabels() {
      let labels = []
      for (let i = 1; i <= 24; i++) {
        if (i === 24) {
          labels.push(`00:00`);
        } else if (i <= 9) {
          labels.push(`0${i}:00`);
        } else {
          labels.push(`${i}:00`);
        }
      }
      return labels
    },
    async generateData(site) {
      await fetch(`${HOST}/${site.id}/reactions`, {
        method: 'GET',
        headers: {
          'Authorization': getCookie('accessToken')
        },
      },).then(async (res) => {
        console.log(await res.json())
      });
    }
  },
  props: {
    site: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      labels: [],
      happy: [],
      neutral: [],
      sad: [],
      data: {
        labels: this.generateLabels(),
        datasets: [
          {
            type: 'bar',
            label: "Content",
            data: [6, 12, 12, 1, 12, 1, 12, 1],
            order: 2,
            backgroundColor: '#4cff41',
          },
          {
            type: 'bar',
            label: "Neutre",
            data: [6, 12, 1, 12, 1],
            order: 2,
            backgroundColor: '#fba813',
          },
          {
            type: 'bar',
            label: "Triste",
            data: [6, 12, 1, 12, 1],
            order: 2,
            backgroundColor: "#ff3434",
          }
          // ,{
          //   type: 'line',
          //   label: "Total",
          //   data: [10, 12, 1, 12, 1],
          //   order: 1,
          //   borderColor: "#20222a",
          // }
        ],
      },
      chartOptions: {
      }
    }
  },
  created() {
  }
}
</script>