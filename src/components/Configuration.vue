<template>
    <div class="mx-16">
        <modal :open=showModal v-on:cancelModal="cancelModal" v-on:addSite="postSite($event)"></modal>
        <device-modal :open=showDeviceModal v-on:cancelModal="cancelDeviceModal"
                      v-on:addDevice="postDevice($event)"></device-modal>

        <main class="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-20 mb-10">
            <div class="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
                <div>
                    <h2 class="text-base font-semibold leading-7 text-gray-900">Gérer son compte</h2>
                    <p class="mt-1 text-sm leading-6 text-gray-500">Modifier les infos du compte.</p>
                    <dl class="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                        <div class="pt-6 sm:flex">
                            <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Nom</dt>
                            <dd class="mt-1 flex justify-end gap-x-6 sm:mt-0 sm:flex-auto">
                                <input type="text" name="receiverMail" ref="receiverMail" id="receiverMail"
                                       class="block w-8/12 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                >
                            </dd>
                        </div>
                        <div class="pt-6 sm:flex">
                            <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Prénom</dt>
                            <dd class="mt-1 flex justify-end gap-x-6 sm:mt-0 sm:flex-auto">
                                <input type="text" name="receiverMail" ref="receiverMail" id="receiverMail"
                                       class="block w-8/12 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                >
                            </dd>
                        </div>
                        <div class="pt-6 sm:flex">
                            <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Société</dt>
                            <dd class="mt-1 flex justify-end gap-x-6 sm:mt-0 sm:flex-auto">
                                <input type="text" name="receiverMail" ref="receiverMail" id="receiverMail"
                                       class="block w-8/12 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                >
                            </dd>
                        </div>
                        <div class="justify-center flex">
                            <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Image du profil</dt>
                            <dd class="mt-1 flex justify-end gap-x-6 sm:mt-0 sm:flex-auto">
                                <input v-on:change="getDataFromPicture" ref="pictureFile"
                                       class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer dark:text-gray-400 focus:outline-none"
                                       id="file_input" type="file">
                            </dd>
                        </div>
                        <div class="justify-center flex">
                            <button type="button"
                                    @click="saveProfile"
                                    class="rounded-md bg-purple-600 px-16 py-5 text-lg font-semibold text-white hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600">
                                Sauvegarder les modifications
                            </button>
                        </div>

                    </dl>
                </div>
                <div>
                    <h2 class="text-base font-semibold leading-7 text-gray-900">Gérer les sites</h2>
                    <p class="mt-1 text-sm leading-6 text-gray-500">Modifier les infos d'un site.</p>
                    <dl class="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                        <div class="pt-6 sm:flex">
                            <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Nom du site</dt>
                            <dd class="mt-1 flex justify-end gap-x-6 sm:mt-0 sm:flex-auto">
                                <map-dropdown
                                        v-if="siteChoices !== undefined && siteChoices.length > 0 && siteChoices[0].length > 0"
                                        :choices="siteChoices[0]" @changeMapChoice="updateDevices($event)"/>
                                <div v-else class="text-gray-400">Aucun site</div>
                            </dd>
                        </div>
                        <div class="pt-6 sm:flex">
                            <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Email du receveur</dt>
                            <dd class="mt-1 flex justify-end gap-x-6 sm:mt-0 sm:flex-auto">
                                <input type="text" name="receiverMail" ref="receiverMail" id="receiverMail"
                                       class="block w-8/12 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                       placeholder="admin@mail.re">
                            </dd>
                        </div>
                        <div class="flex border-t border-gray-100 pt-6">
                            <button type="button"
                                    @click="showModal = true"
                                    class="text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500"><span
                                    aria-hidden="true">+</span> Ajouter un site
                            </button>
                        </div>
                    </dl>
                </div>
                <div>
                    <h2 class="text-base font-semibold leading-7 text-gray-900">Gérer les appareils d'un site</h2>
                    <p class="mt-1 text-sm leading-6 text-gray-500">Configurer les appareils d'un site.</p>
                    <ul role="list" class="mt-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                        <li class="flex justify-between gap-x-6 py-6">
                            <div class="font-medium text-gray-900">Sur site</div>
                            <map-dropdown
                                    v-if="siteChoices !== undefined && siteChoices.length > 0 && siteChoices[0].length > 0"
                                    :choices="siteChoices[0]" @changeMapChoice="updateDevices($event)"/>
                            <div v-else class="text-gray-400">Aucun site</div>

                        </li>
                        <li class="flex justify-between gap-x-6 py-6">
                            <div class="font-medium text-gray-900">Liste des appareils</div>
                            <dropdown v-if="devicesChoices.length > 0" :choices="devicesChoices"/>
                            <div v-else class="text-gray-400">Aucun appareil</div>
                        </li>
                        <li class="flex justify-between gap-x-6 py-6">
                            <div class="font-medium text-gray-900">Type d'animation</div>
                            <dropdown :choices=this.animation_type />
                        </li>
                        <li class="flex justify-between gap-x-6 py-6">
                            <div class="font-medium text-gray-900">Synchroniser toutes les x heures</div>
                            <dropdown :choices="this.sync_time"/>
                        </li>
                    </ul>
                    <div class="flex border-t border-gray-100 pt-6">
                        <button type="button"
                                class="text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                                @click="showDeviceModal = true"><span
                                aria-hidden="true">+</span> Ajouter un appareil
                        </button>
                    </div>
                </div>

            </div>
        </main>
    </div>
</template>

<script>
import AddSite from "@/components/AddSite.vue";
import Dropdown from "@/components/Dropdown.vue";
import Site from "@/components/SitesList.vue";
import AddDevice from "@/components/AddDevice.vue";
import MapDropdown from "@/components/MapDropdown.vue";
import {getCookie, HOST} from "@/utils";
import axios from "axios";


export default {
    components: {
        "modal": AddSite,
        "deviceModal": AddDevice,
        "dropdown": Dropdown,
        "map-dropdown": MapDropdown,
    },
    data() {
        return {
            showModal: false,
            showDeviceModal: false,
            // TODO: ANIMATION TYPE ENUM -> STRING
            animation_type: [
                "SPIN",
                "BOUNCE"
            ],
            // TODO: SYNC TIME ENUM -> IN HOURS
            sync_time: [
                6,
                12,
                24,
                48,
                72,
                96,
                // CUSTOM VALUE WITH CHECK
            ],
            siteChoices: [],
            file: {},
            devicesChoices: [],
            selectedSiteId: -1,
        }
    },
    methods: {
        async cancelModal() {
            this.showModal = false
        },
        async getDataFromPicture() {
            let file = this.$refs.pictureFile.files[0]
            if (file.type !== "image/png") {
                console.log("INVALID FILE")
            } else {
                this.file = file
            }
        },
        async cancelDeviceModal() {
            this.showDeviceModal = false
        },
        async saveProfile() {
            const formData = new FormData();

            // Append the selected file to the FormData object
            formData.append('file', this.file);

            // Send the FormData to your backend using Axios or another HTTP library
            axios
                .post(`${HOST}/me`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': getCookie('accessToken')
                    },
                })
                .then((response) => {
                    console.log('File uploaded successfully');
                })
                .catch((error) => {
                    // Handle errors
                    console.error('Error uploading file:', error);
                });
        },
        async updateDevices(event) {
            this.selectedSiteId = event.id
            await fetch(`${HOST}/${event.id}/devices`, {
                headers: {
                    'Authorization': getCookie('accessToken')
                }
            }).then(async (res) => {
                if (res.status === 401) {
                    console.log("Unauthorized")
                }
                this.devicesChoices = ((await res.json()).result.map((device) => {
                    return device.name
                }))
            })
        },
        async getSitesChoices() {
            // LOGIN
            await fetch(`${HOST}/sites`, {
                headers: {
                    'Authorization': getCookie('accessToken')
                }
            }).then(async (res) => {
                if (res.status === 401) {
                    console.log("Unauthorized")
                }
                this.siteChoices.push(((await res.json()).result.map((site) => {
                    console.log("PUSHING: " + site)
                    return {"name": site.name, "id": site.id}
                })))
            })
        },
        async postDevice(data) {
            let req = await fetch(`${HOST}/devices`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': getCookie('accessToken')
                },
                body: JSON.stringify({
                    name: `${data.name}`,
                    site_id: `${this.selectedSiteId}`
                })
            })
            this.showDeviceModal = false
        },
        async postSite(data) {
            let req = await fetch(`${HOST}/sites`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': getCookie('accessToken')
                },
                body: JSON.stringify({
                    name: `${data.site}`,
                    device_name: `${data.device}`,
                    send_to: `${data.receiver}`
                })
            })
            this.showModal = false
        },
    },
    created() {
        this.getSitesChoices()
    }
}
</script>


<script setup>
import {HOST} from "@/utils";

</script>
