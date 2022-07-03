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
                <div class="relative inline-block align-bottom bg-gray-800 text-gray-200 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                    <div>
                        <div @click="open = false" 
                             class="flex items-center justify-center h-6 w-6 rounded-full bg-pink-100">
                            <i class='fa fa-close text-black'> </i>
                        </div>

                        <div class="mt-3 text-center sm:mt-5">
                            <div v-for="ad in allAdvertisements"
                                :key="ad.id">
                                
                                <img @click="updateCount(ad.id, ad.clickCount)"
                                     class="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full" 
                                     :src="ad.photoURL" alt="">
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
// import { ref } from 'vue'
import { reactive, toRefs } from 'vue'
import { Dialog, DialogOverlay, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { useAdvertisements } from '../services/firebase'

export default {
    components: {
        Dialog,
        DialogOverlay,
        TransitionChild,
        TransitionRoot,
    },
    setup() {

        const state = reactive({ 
            open: true,
        })

        const { allAdvertisements, newAdvertisment, updateCount, updateView} = useAdvertisements()


        return { ...toRefs(state), allAdvertisements, newAdvertisment, updateCount, updateView}

    },
    methods: {

    }
}
</script>