<template>
  <td class="whitespace-nowrap flex justify-center text-right px-12 py-6 font-medium">
    {{ this.reactions.length }}
  </td>
</template>

<script>
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
      await fetch(`http://localhost:3000/${this.id}/reactions`, {
        method: 'GET',
        headers: {
          'Authorization': document.cookie.split('=')[1]
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
</script>