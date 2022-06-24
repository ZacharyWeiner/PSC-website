<template>
 <div class="bg-white">
        <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div class="bg-indigo-700 rounded-lg shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
            <div class="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
            <div class="lg:self-center text-left">
                <h2 class=" md:text-left text-3xl font-extrabold text-white sm:text-4xl">
                <span class="block">A New Game Has Started</span>
                <!-- <span class="block">With Ranks &amp; Rarity</span> -->
                </h2>
                <p class="mt-4 text-lg leading-6 text-indigo-200 md:text-left"> Bingo is a fun community buiding game where anyone can win. Click the link below to play.  </p>
                <button @click="buttonClicked" class="mt-8 bg-white border border-transparent rounded-md shadow px-5 py-3 inline-flex items-center text-base font-medium text-indigo-600 hover:bg-indigo-50">Play Now  <ExternalLinkIcon class="-mr-1 ml-3 h-5 w-5 text-gray-400" aria-hidden="true" /> </button>
            </div>
            </div>
            <div class="-mt-12 aspect-w-5 aspect-h-3 md:aspect-w-2 md:aspect-h-1">
            <img class="transform rounded-md object-cover object-left-top sm:translate-x-16 lg:translate-y-20" src="https://slavettes-layers.s3.amazonaws.com/pewnicorns/2268.png" alt="App screenshot" />
            </div>
        </div>
        </div>
    </div>
  
</template>

<script>
import { reactive, toRefs } from 'vue'
import { ExternalLinkIcon } from '@heroicons/vue/solid'
export default {
    components:{ ExternalLinkIcon },
    setup () {
        const state = reactive({
            count: 0,
        })
    
        return {
            ...toRefs(state),
        }
    },
    methods:{
        buttonClicked(){
            console.log("Button Clicked")
            this.$emit('playGameClicked')
        }
    }
}
</script>

<style lang="scss" scoped>

</style>