<template>
  <div class="mt-4 flex justify-center">
    <button type="button"
            @click="this.showModal = true"
            class="order-0 inline-flex items-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 sm:order-1 sm:ml-3">
      Ajouter un site
    </button>
  </div>
  <h3 class="px-3 mt-3 text-sm font-medium text-gray-500" id="desktop-teams-headline">Sites</h3>

  <modal :open=showModal v-on:cancelModal="cancelModal" v-on:addSite="postSite($event)"></modal>

  <div class="mt-1 space-y-1" role="group" aria-labelledby="desktop-teams-headline">
    <a v-for="site in sites" :key="site.id" :href="site.href" v-on:click="selectSite(site)"
       :class="[selectedSite === site.id ? 'bg-gray-300' : 'hover:bg-gray-200', 'group', 'flex', 'items-center', 'rounded-md px-3', 'py-2', 'text-sm', 'font-medium', 'text-gray-700', 'hover:text-gray-900']">
      <span :class="['bg-green-500', 'mr-3 h-2.5 w-2.5 rounded-full']" aria-hidden="true"/>
      <span class="truncate w-2/3">{{ site.name }}</span>
      <button class="text-red-500 font-extrabold" @click="removeSite(site)">DEL</button>
    </a>
  </div>


</template>

<script>
import AddSite from "@/components/AddSite.vue";
import {getCookie, HOST} from "@/utils";

export default {
  data() {
    return {
      selectedSite: 0,
      showModal: false,
      sites: [],
    }
  },
  components: {
    "modal": AddSite,
  },
  emits: ['changeSite'],
  methods: {
    async removeSite(site) {
      let del = await fetch(`${HOST}/sites/${site.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': getCookie('accessToken')
        },
      })
    },
    selectSite(site) {
      if (this.selectedSite === site.id) {
        return
      }
      this.$emit('changeSite', site)
      this.selectedSite = site.id
    },
    async postSite(data) {
      console.log(document.cookie)
      console.log(getCookie('accessToken'))
        // TODO: REMOVE THIS
      let temp = new Date().toISOString().slice(0, 19).replace('T', ' ')

        let req = await fetch(`${HOST}/sites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': getCookie('accessToken')
        },
        body: JSON.stringify({
          name: `${data.site}`,
          open_at: `${temp}`,
          close_at: `${temp}`,
          send_to: `${data.receiver}`
        })
      })
      this.showModal = false
    },
    async cancelModal() {
      this.showModal = false
    },
    async getSites() {
      // LOGIN
      await fetch(`${HOST}/sites`, {
        headers: {
          'Authorization': getCookie('accessToken')
        }
      }).then(async (res) => {
        if (res.status === 401) {
          console.log("Unauthorized")
        }
        this.sites = ((await res.json()).result)
      })
    },
  },
  created() {
    this.getSites().then(() => {
      if (this.selectedSite) {
        this.selectedSite = this.sites[0].id
        this.$emit('changeSite', this.sites[0])
      }
    })
  }
}
</script>

<script setup>
import {HOST} from "@/utils";


</script>
