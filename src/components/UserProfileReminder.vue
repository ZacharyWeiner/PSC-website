<template>
<div class="text-white">
    <TransitionRoot as="template" :show="open">
        <Dialog as="div" class="fixed z-10 inset-0 overflow-y-auto">
            <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                    <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </TransitionChild>

                <!-- This element is to trick the browser into centering the modal contents. -->
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                <div class="relative inline-block align-bottom bg-gray-800 text-gray-200 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                    <div>
                        <div class="text-center">
                            <div class="">
                                <div class="mt-5 md:mt-0 md:col-span-2">
                                    <div class="space-y-6">
                                        <div class="grid grid-cols-3 gap-6 text-black">
                                            <div class="col-span-4 text-white">Would you like to update your profile?</div> 
                                            <div v-if="showHandCash" class="col-span-4">
                                                <div class="mt-1 flex rounded-md shadow-sm">
                                                <span class="w-32 inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm h-12 pl-2 "> Handcash </span>
                                                <input v-model="edit_handcash" type="text" name="company-handcash" id="company-handcash" class="px-2 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="" />
                                                </div>
                                            </div>
                                            <div v-if="showTwitter"  class="col-span-4">
                                                <div class="mt-1 flex rounded-md shadow-sm">
                                                <span class="w-32 inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm h-12 pl-2 "> Twitter</span>
                                                <input v-model="edit_twitter" type="text" name="company-twitter" id="company-twitter" class="px-2 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="" />
                                                </div>
                                            </div>
                                            <div v-if="showEmail"  class="col-span-4">
                                                <div class="mt-1 flex rounded-md shadow-sm">
                                                <span class="w-32 inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm h-12 pl-2 "> Email </span>
                                                <input v-model="edit_email" type="text" name="company-phone" id="company-phone" class="px-2 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="" />
                                                </div>
                                            </div>
                                            <div v-if="showPhone"  class="col-span-4">
                                                <div class="mt-1 flex rounded-md shadow-sm">
                                                <span class="w-32 inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-700 text-sm h-12 pl-2 "> Phone </span>
                                                <input v-model="edit_phone" type="tel" name="company-phone" id="company-phone" class="px-2 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="flex">
                                        <button @click="saveUserProfile" 
                                        class="w-full text-white bg-gradient-to-r from-teal-400 via-green-500 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-bold rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                                            Save
                                    </button>
                                        <button @click="open = false" 
                                        class="w-full text-white bg-gradient-to-r from-pink-400 via-red-500 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-bold rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                                            Cancel
                                    </button>
                                    </div> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    </div>
                </TransitionChild>
            </div>
        </Dialog>
    </TransitionRoot>
</div>


</template>

<script>
import { reactive, toRefs } from 'vue'
import { Dialog, DialogOverlay, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { userProfiles } from "./../services/firebase.js"
import { useStore } from 'vuex'

export default {
    components: {
        Dialog,
        DialogOverlay,
        TransitionChild,
        TransitionRoot,
    },
    setup() {
        let { findProfileByHandle, updateUserProfile } = userProfiles()
        let store = useStore()
        let profile = findProfileByHandle(store.state.relayx_handle)

        const state = reactive({ 
            open: true,
            edit_handcash: "",
            edit_twitter:"",
            edit_email:"",
            edit_phone:"",
        })

        return { ...toRefs(state), profile, updateUserProfile }

    },
    props: {
        showProfileFields: Array 
    },
    methods: {
        edit(){
            this.edit_handcash = this.profile[0].handcashHandle
            this.edit_twitter = this.profile[0].twitterHandle
            this.edit_email = this.profile[0].email
            this.edit_phone = this.profile[0].phone
        },
        saveUserProfile(){
            this.updateUserProfile(this.profile[0].id, this.$store.state.relayx_handle, this.$store.state.user_address, this.edit_handcash, this.edit_twitter,this.edit_email, this.edit_phone)
            this.open = false
        },
        checkShowField(_field) {
            if (this.showProfileFields.filter(f => f === _field ).length) {
                console.log()
                return true
            }
            return false
        }

    }, 
    computed:{
        selectedProfile(){
            if(this.profile && this.profile[0]){
                console.log(this.profile[0].id)
                this.edit()
                return this.profile[0]
            }
            return {relayx_handle: ""}
        },
        showHandCash() {
            let hasField = this.checkShowField('handcash')
            return hasField
        },
        showTwitter() {
            let hasField = this.checkShowField('twitter')
            return hasField
        },
        showEmail() {
            let hasField = this.checkShowField('email')
            return hasField
        },
        showPhone() {
            let hasField = this.checkShowField('phone')
            return hasField
        }
        
    }
}
</script>