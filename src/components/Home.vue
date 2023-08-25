<template>
  <div class="min-h-full">
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog as="div" class="relative z-40 lg:hidden" @close="sidebarOpen = false">
        <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0"
                         enter-to="opacity-100" leave="transition-opacity ease-linear duration-300"
                         leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-600 bg-opacity-75"/>
        </TransitionChild>
        <div class="fixed inset-0 z-40 flex">
          <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"/>
          <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
                           enter-from="-translate-x-full" enter-to="translate-x-0"
                           leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0"
                           leave-to="-translate-x-full">
            <DialogPanel class="relative flex w-full max-w-xs flex-1 flex-col bg-white pb-4 pt-5">
              <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0"
                               enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100"
                               leave-to="opacity-0">
                <div class="absolute right-0 top-0 -mr-12 pt-2">
                  <button type="button"
                          class="relative ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                          @click="sidebarOpen = false">
                    <span class="absolute -inset-0.5"/>
                    <span class="sr-only">Close sidebar</span>
                    <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true"/>
                  </button>
                </div>
              </TransitionChild>
              <div class="flex flex-shrink-0 items-center px-4">
                <img class="h-8 w-auto" src="../assets/SatisfactionZ_logo.svg"
                     alt="SatisfactionZ"/>
              </div>
              <div class="mt-5 h-0 flex-1 overflow-y-auto">
                <nav class="px-2">
                  <div class="space-y-1">
                  </div>
                  <div class="mt-8">
                    <h3 class="px-3 text-sm font-medium text-gray-500" id="mobile-teams-headline">Sites</h3>
                    <div class="mt-1 space-y-1" role="group" aria-labelledby="mobile-teams-headline">
                      <a v-for="site in sites.result" :key="site.id" :href="site.href"
                         class="group flex items-center rounded-md px-3 py-2 text-base font-medium leading-5 text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                        <span :class="['bg-green-500', 'mr-4 h-2.5 w-2.5 rounded-full']" aria-hidden="true"/>
                        <span class="truncate">{{ site.name }}</span>
                      </a>
                    </div>
                  </div>
                </nav>
              </div>
            </DialogPanel>
          </TransitionChild>
          <div class="w-14 flex-shrink-0" aria-hidden="true">
            <!-- Dummy element to force sidebar to shrink to fit close icon -->
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div
        class="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-gray-200 lg:bg-gray-100 lg:pb-4 lg:pt-5">
      <!-- Sidebar component, swap this element with another sidebar if you like -->

      <profile :user=user />
      <navigation v-on:changeNav="changeNav($event)"/>

      <!--        DIVIDER       -->
      <div class="relative mt-3">
        <div class="absolute inset-0 flex items-center" aria-hidden="true">
          <div class="w-full border-t border-gray-300"/>
        </div>
      </div>

      <div class="h-3/4">
        <site v-on:changeSite="changeSite" v-if="selectedNav === 1"/>
      </div>
      <div class="p-5 m-5 rounded-2xl bg-red-500 justify-center justify-items-center flex">
        <button class="text-lg font-semibold" @click="logout">
          Se déconnecter
        </button>
      </div>
    </div>
    <!-- Main column -->
    <div class="flex flex-col lg:pl-64">
      <!-- Search header -->
      <div class="sticky top-0 z-10 flex h-16 flex-shrink-0 border-b border-gray-200 bg-white lg:hidden">
        <button type="button"
                class="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 lg:hidden"
                @click="sidebarOpen = true">
          <span class="sr-only">Open sidebar</span>
          <Bars3CenterLeftIcon class="h-6 w-6" aria-hidden="true"/>
        </button>
        <div class="flex flex-1 justify-between px-4 sm:px-6 lg:px-8">
          <div class="flex flex-1">
          </div>
          <div class="flex items-center">
            <!-- Profile dropdown -->
            <Menu as="div" class="relative ml-3">
              <div>
                <MenuButton
                    class="relative flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                  <span class="absolute -inset-1.5"/>
                  <span class="sr-only">Open user menu</span>
                  <img class="h-8 w-8 rounded-full"
                       src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                       alt=""/>
                </MenuButton>
              </div>
              <transition enter-active-class="transition ease-out duration-100"
                          enter-from-class="transform opacity-0 scale-95"
                          enter-to-class="transform opacity-100 scale-100"
                          leave-active-class="transition ease-in duration-75"
                          leave-from-class="transform opacity-100 scale-100"
                          leave-to-class="transform opacity-0 scale-95">
                <MenuItems
                    class="absolute right-0 z-10 mt-2 w-48 origin-top-right divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div class="py-1">
                    <MenuItem v-slot="{ active }">
                      <a href="#"
                         :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">View
                        profile</a>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                      <a href="#"
                         :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Settings</a>
                    </MenuItem>
                  </div>
                  <div class="py-1">
                    <MenuItem v-slot="{ active }">
                      <a href="#"
                         :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Logout</a>
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>
      <main v-if="selectedNav === 1" class="flex-1">
        <!-- Page title & actions -->
        <div
            class="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div class="min-w-0 flex-1">
            <h1 class="text-lg font-medium leading-6 text-gray-900 sm:truncate">Nom du site</h1>
          </div>
        </div>

        <!-- Projects table (small breakpoint and up) -->
        <div class="hidden sm:block">
          <div class="inline-block min-w-full border-b border-gray-200 align-middle">
            <div class="sm:py-32 lg:px-8" v-if="reactions.length === 0">
              <div class="mx-auto max-w-2xl text-center">
                <p class="text-base font-semibold leading-7 text-indigo-600">Une petite minute...</p>
                <h4 class="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Aucune réaction reçue</h4>
              </div>
            </div>
            <table v-else class="min-w-full">
              <thead>
              <tr class="border-t border-gray-200">
                <th class="border-b border-gray-200 bg-gray-50 px-6 py-3 text-center text-sm font-semibold text-gray-900"
                    scope="col">
                  <span class="lg:pl-2">Reaction</span>
                </th>
                <th class="border-b justify-center border-gray-200 bg-gray-50 px-12 py-3 text-sm font-semibold text-gray-900"
                    scope="col">Date
                </th>
                <th class="hidden text-center flex border-b border-gray-200 bg-gray-50 px-6 py-3 text-sm font-semibold text-gray-900 md:table-cell"
                    scope="col">Commentaire
                </th>
                <th class="border-b border-gray-200 bg-gray-50 py-3 pr-6 text-center text-sm font-semibold text-gray-900"
                    scope="col"/>
              </tr>
              </thead>

              <tbody class="divide-y divide-gray-100 bg-white">
              <!--              // HAS REPORT-->
              <tr v-for="reaction in reactions" :key="reaction.id">
                <td :class="[reaction.state === 'satisfait' ? 'bg-green-300' : reaction.state === 'neutre' ? 'bg-amber-200' : 'bg-red-400', 'whitespace-nowrap text-center px-6 py-3 text-sm font-medium text-gray-900']">
                  {{ reaction.state }}
                </td>
                <td class="hidden whitespace-nowrap px-6 py-3 text-center text-sm text-gray-500 md:table-cell">
                  {{ moment(reaction.created_at, 'YYYY-MM-DD HH:mm').format('DD/MM/YYYY HH:mm') }}
<!--                  {{ reaction.created_at }}-->
                </td>
                <td class="hidden whitespace-nowrap px-6 py-3 text-center text-sm text-gray-500 md:table-cell">
                  {{ reaction.comment === 'undefined' ? '/' : reaction.comment }}
                </td>
<!--                <td class="hidden whitespace-nowrap px-6 py-3 text-center text-sm text-gray-500 md:table-cell">-->
<!--                  <button type="button"-->
<!--                          class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-900 bg-white hover:bg-gray-50">-->
<!--                    Voir plus-->
<!--                  </button>-->
<!--                </td>-->
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <configuration v-else/>

    </div>
  </div>

</template>


<script>
import Profile from "@/components/Profile.vue";
import Navigation from "@/components/Navigation.vue";
import Site from "@/components/SitesList.vue";
import Reactions from "@/components/Reactions.vue";
import Configuration from "@/components/Configuration.vue";
import {createRouter as router} from "vue-router";

export default {
  components: {
    "profile": Profile,
    "navigation": Navigation,
    "site": Site,
    "reaction": Reactions,
    "configuration": Configuration
  },
  data() {
    return {
      sites: [],
      reactions: [],
      user: {},
      selectedNav: 1,
      selectedSite: 0,
    };
  },
  methods: {
    async removeSite(site) {
      await fetch(`${HOST}/sites/${site.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': document.cookie.split('=')[1]
        },
      },)
    },
    async logout() {
      console.log(document.cookie)
      console.log('CLEARING')
      // document.cookie = "accesstoken="
      console.log(document.cookie)
      this.$router.push('/login')
    },
    async getUser() {
      await fetch(`${HOST}/me`, {
        method: 'GET',
        headers: {
          'Authorization': document.cookie.split('=')[1]
        },
      },).then(async (res) => {
        this.user = (await res.json()).infos
      });
    },
    async changeSite(id) {
      this.selectedSite = id
      await fetch(`${HOST}/${id}/reactions`, {
        method: 'GET',
        headers: {
          'Authorization': document.cookie.split('=')[1]
        },
      }).then(async (res) => {
        this.reactions = (await res.json()).result
      })
    },
    async changeNav(event) {
      this.selectedNav = event.id
    },
    async checkAuth() {
      console.log(document.cookie)
      if (document.cookie.split('=')[1] === undefined)
        return false
      if (document.cookie.split('=')[1] === "")
        return false
      if (document.cookie === "")
        return false
      return document.cookie !== undefined;
    },
  },
  created() {
    this.checkAuth().then((value) => {
      console.log(value)
      if (value)
        this.getUser();
      else
        router.push('/login')
    })
  },
};
</script>

<script setup>
import {ref} from 'vue'
import {
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import moment from 'moment'
import {Bars3CenterLeftIcon, XMarkIcon} from '@heroicons/vue/24/outline'
import {HOST} from "@/utils";

const sidebarOpen = ref(false)
</script>