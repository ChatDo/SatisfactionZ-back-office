<template>
  <td class="whitespace-nowrap flex justify-center text-right px-12 py-6 font-medium">
    {{ this.reactions.length }}
  </td>
</template>

<script>
import {getCookie, HOST} from "@/utils";

export default {
  data() {
    return {
      reactions: {},
    }
  },
  props: {
    id: {
      required: true,
    },
  },
  methods: {
    async getReportReaction() {
      await fetch(`${HOST}/${this.id}/reactions`, {
        method: 'GET',
        headers: {
          'Authorization': getCookie('accessToken')
        },
      }).then(async (res) => {
        this.reactions = (await res.json()).result
      })
    },
  },
  async created() {
    this.getReportReaction().then(() => {
    })
  }
}
</script>

<script setup>
import {HOST} from "@/utils";

</script>