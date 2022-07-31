<template>
<div class="text-white">
    <TransitionRoot as="template" :show="isOpen">
        <Dialog as="div" class="fixed z-10 inset-0 overflow-y-auto">
            <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                    <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </TransitionChild>

                <!-- This element is to trick the browser into centering the modal contents. -->
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                    <div v-if="!showBingo" class="relative inline-block align-bottom bg-gray-800 text-gray-200 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                        <div>
                            <div class="text-center">
                                <div class="">
                                    <img @click="updateCount(lastAd.id, lastAd.clickCount)"
                                        class="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full" 
                                        :src="lastAd.photoURL" alt="">
                                    <p class='text-xl font-black pt-1'> {{lastAd.headline ? lastAd.headline : "This is a headline"}} </p>
                                    <p class='p-4'> {{lastAd.description ? lastAd.decription : "lets see what this decription looks like "}} </p>
                                </div>
                                <div class="space-y-2 pt-2">
                                    <div class="w-full "><button @click="viewAd(ad)" class="items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full">Check It Out!</button></div>
                                    <div class="w-full"><button @click="$emit('closeModal')" class="items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-red-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full">Go Back </button></div>
                                </div>
                            </div>
                        </div>
                    </div>
                     <div v-else class="relative inline-block align-bottom bg-gray-800 text-gray-200 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                        <div>
                            <div class="text-center">
                                <div class="">
                                    <img
                                        class="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full" 
                                        src="https://slavettes-layers.s3.amazonaws.com/pewnicorns/corns-gif-2.gif" alt="">
                                    <p class='text-xl font-black pt-1'> {{lastAd.headline ? lastAd.headline : "Someone Has Called Bingo"}} </p>
                                    <p class='p-4'> {{lastAd.description ? lastAd.decription : "please wait while we confirm the winning card"}} </p>
                                </div>
                                <!-- <div class="space-y-2 pt-2">
                                    <div class="w-full "><button @click="viewAd(ad)" class="items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full">Check It Out!</button></div>
                                    <div class="w-full"><button @click="open = false" class="items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-red-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full">Go Back </button></div>
                                </div> -->
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
// import { ref } from 'vue'
import { reactive, toRefs } from 'vue'
import { Dialog, DialogOverlay, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { useAdvertisements } from '../services/firebase'
import { useStore } from 'vuex'

export default {
    components: {
        Dialog,
        DialogOverlay,
        TransitionChild,
        TransitionRoot,
    },
    setup(props) {
        // let _open = false; 
        let _showBingo = false
        // // let _gameCount = 0
        // if(props.isOpen){_open = true}
        if(props.isBingo){_showBingo = true}

        const store = useStore()
        const state = reactive({ 
            // open: _open,
            showBingo: _showBingo
        })

        const { allAdvertisements, newAdvertisment, updateCount, updateView} = useAdvertisements()
        console.log(allAdvertisements)
        return { ...toRefs(state), allAdvertisements, newAdvertisment, updateCount, updateView, store }

    },
    methods: {
        
    }, 
    computed:{
        lastAd(){
           if(this.allAdvertisements[0]){
            return this.allAdvertisements[0]
           }
           return {id: "", headline: "" , photoURL: "", clickCount:0, description: "lets see what this decription looks like "}
        }
    },
    props:["isBingo", "isOpen"],
    emits: {}
}
</script>