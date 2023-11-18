<template>
  <div class="w-9/12 flex">
    <Bar
        id="bar-chart"
        v-if="loaded"
        :options="this.chartOptions"
        :data="this.data"
    />
  </div>

</template>

<script>
import {Bar} from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
} from 'chart.js'
import {getCookie, HOST} from "@/utils";
import moment from "moment";
import {toRaw} from "vue";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement)

export default {
  name: 'bar-chart',
  components: {Bar},
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
    generateData() {
      fetch(`${HOST}/${this.siteId}/reactions`, {
        method: 'GET',
        headers: {
          'Authorization': getCookie('accessToken')
        },
      },).then((res) => res.json())
          .then((data) => {
            console.log("Checking")
            console.log(data)
            let list = []
            let happy = []
            let sad = []
            let neutral = []
            for (let i = 0; i < data.result.reactions.length; i++) {
              list.push(
                  {
                    'state': data.result.reactions[i].state,
                    'hour': moment(data.result.reactions[i].created_at).format('HH')
                  }
              )
            }
            list.sort()
            let finalCountHappy = {}
            let finalCountSad = {}
            let finalCountNeutral = {}
            for (let i = 0; i <= 24; i++) {
              // COUNT GLOBALLY OCCURENCE OF EACH NUMBER IN LIST
              finalCountHappy[i] = (finalCountHappy[i] || 0)
              finalCountSad[i] = (finalCountSad[i] || 0)
              finalCountNeutral[i] = (finalCountNeutral[i] || 0)
              if (i >= list.length) {
                continue
              }
              if (list[i].state === "satisfait" || list[i].state === "happy") {
                finalCountHappy[list[i].hour] = (finalCountHappy[list[i].hour] || 0) + 1
              }
              if (list[i].state === "insatisfait" || list[i].state === "unhappy") {
                finalCountSad[list[i].hour] = (finalCountSad[list[i].hour] || 0) + 1
              }
              if (list[i].state === "neutre" || list[i].state === "neutral") {
                finalCountNeutral[list[i].hour] = (finalCountNeutral[list[i].hour] || 0) + 1
              }
            }
            for (let i = 0; i < 24; i++) {
              console.log(finalCountHappy[i])
              happy.push(toRaw(finalCountHappy[i]))
              sad.push(finalCountSad[i])
              neutral.push(finalCountNeutral[i])
            }
            this.data = {
              labels: this.generateLabels(),
              datasets: [
                {
                  type: 'bar',
                  label: "Content",
                  data: happy,
                  order: 2,
                  backgroundColor: '#4cff41',
                },
                {
                  type: 'bar',
                  label: "Neutre",
                  data: neutral,
                  order: 2,
                  backgroundColor: '#fba813',
                },
                {
                  type: 'bar',
                  label: "Triste",
                  data: sad,
                  order: 2,
                  backgroundColor: "#ff3434",
                }
              ],
            }
            this.loaded = true;
          });
    }
  },
  props: {
    siteId: {
      type: Number,
      required: false
    }
  },
  data() {
    return {
      labels: [],
      happy: [],
      neutral: [],
      sad: [],
      data: null,
      loaded: false,
      chartOptions: {}
    }
  },
  created() {
  },
  mounted() {
    this.generateData()
  }
}
</script>
