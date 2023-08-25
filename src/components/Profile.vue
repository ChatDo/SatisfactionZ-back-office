<template>
  <div class="flex flex-col overflow-y-auto pt-1">
    <!-- User account dropdown -->
    <Menu as="div" class="relative inline-block px-3 text-left">
      <div class="flex justify-center justify-items-center">
<!--        <MenuButton-->
<!--            class="group w-full rounded-md bg-gray-100 px-3.5 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-100">-->
              <span class="flex w-full items-center justify-between">
                <span class="flex min-w-0 items-center justify-between space-x-3">
<!--                  <img class="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"-->
<!--                       src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"-->
<!--                       alt=""/>-->
                  <span class="flex min-w-0 flex-1 flex-col">
                    <span class="truncate text-sm font-medium text-gray-900">{{
                        user.name + " " + user.firstname
                      }}</span>
                    <span class="truncate text-sm text-gray-500">{{ user.email }}</span>
                    <span class="truncate text-sm font-bold text-gray-500">{{ user.company }}</span>
                  </span>
                </span>
<!--                <ChevronUpDownIcon class="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"-->
<!--                                   aria-hidden="true"/>-->
              </span>
<!--        </MenuButton>-->
      </div>
<!--      <div class="relative">-->
<!--        <div class="absolute inset-0 flex" aria-hidden="true">-->
<!--          <div class="w-full border-t border-gray-300" />-->
<!--        </div>-->
<!--      </div>-->
      <transition enter-active-class="transition ease-out duration-100"
                  enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-75"
                  leave-from-class="transform opacity-100 scale-100"
                  leave-to-class="transform opacity-0 scale-95">
        <MenuItems
            class="absolute left-0 right-0 z-10 mx-3 mt-1 origin-top divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div class="py-1">
            <MenuItem v-slot="{ active }">
              <a href="#"
                 :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Settings</a>
            </MenuItem>
          </div>
          <div class="py-1">
            <MenuItem v-slot="{ active }">
              <a href="#"
                 :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']" class="text-red-500 font-semibold">Logout</a>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
    <nav class="mt-6 px-3">
      <div class="space-y-1">

      </div>
    </nav>
  </div>

</template>

<script>
  export default {
    props: {
      user: {
        type: Object,
        required: true,
      },
    },
    methods: {
    }
  }
</script>

<script setup>
import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/vue";
import {ChevronUpDownIcon} from "@heroicons/vue/20/solid";
</script>