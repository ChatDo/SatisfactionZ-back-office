<template>
  <a v-for="item in navigation" :key="item.id" :href="item.href"
     @click="selectNavigation(item.id, item.name)"
     :class="[selectedNavigation === item.id ? 'bg-gray-300 text-gray-900' : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900', 'group flex items-center rounded-md px-2 py-2 text-base font-medium leading-5']"
     >
    <span
               :class="[selectedNavigation === item.id ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500', 'mr-3 h-6 w-6 flex-shrink-0']"
               aria-hidden="true"/>
    {{ item.name }}
  </a>
</template>

<script>
export default {
  data() {
    return {
      selectedNavigation: 1,
      navigation: [
        {id: 1, name: 'Dashboard', href: '#'},
        {id: 2, name: 'Configuration', href: '#'},
      ],
    }
  },
  emits: ['changeNav'],
  methods: {
    selectNavigation(id, name) {
      if (this.selectedNavigation === id) {
        return
      }
      console.log(id, name)
      // TODO: Fix this warning
      this.selectedNavigation = id
      console.log( this.selectedNavigation)

      this.$emit('changeNav', {id, name})
    }
  }
}
</script>

<script setup>

</script>
