<template>
    <div>
        <Menu />
          <div class="relative bg-white py-16 sm:py-24 lg:py-32">
            <div class="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 class="text-base font-semibold uppercase tracking-wider text-indigo-600">What Do We Do With</h2>
            <p class="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl"> The Magical Pewnicorns</p>
            <p class="mx-auto mt-5 max-w-prose text-xl text-gray-500">On mint day, there should have been 1234 Pewnicorns for sale. <br/> For a few weeks we were only able to see the first 800. </p>
            <p class="mx-auto mt-5 max-w-prose text-xl text-gray-500"> <b>We will burn all editions over 1234, but  <br /> <span class='text-red-400 text-3xl'>  What Do We Do With #800 - #1234? </span> </b>  </p>
            <p class="mx-auto mt-5 max-w-prose text-md text-gray-900">Voting Closes 12pm EDT Thursday April 14.</p>
            <div class="mt-12">
                <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <div v-for="feature in features" :key="feature.name" class="pt-6">
                    <div class="flow-root rounded-lg bg-gray-50 px-6 pb-8">
                    <div class="-mt-6">
                        <div>
                        <span class="inline-flex items-center justify-center rounded-md bg-indigo-500 p-3 shadow-lg">
                            <span class="h-6 w-6 text-white" aria-hidden="true" > {{feature.number}} </span>
                        </span>
                        </div>
                        <h3 class="mt-8 text-lg font-medium tracking-tight text-gray-900">{{ feature.name }}</h3>
                        <p class="mt-5 text-base text-gray-500 h-24">{{ feature.description }}</p>
                        <!-- <p class="mt-5 text-base text-blue-500">To Vote for <span class="text-blue-900 font-bold" > Option {{feature.number}} </span> send $POO to: </p>
                        <p class='m-1 p-1 ring-1 rounded'><span class='text-blue-700'>{{feature.number}}</span> </p> -->
                        <p class="mt-5 text-base text-blue-500"><span :class="feature.color" > Option {{feature.number}} </span> </p>
                        <p class='m-1 p-1 ring-1 rounded'><span :class='feature.color'>{{feature.votes}} VOTES</span> </p>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import Menu from "../components/Menu.vue"
import Footer from "../components/Footer.vue"
const features = [
  {
    name: 'Burn Them All',
    description: 'Destroy #NFTs with an edition number over 800. \n',
    number: 1, 
    votes: 2152,
    color: "text-red-500"
  },
  {
    name: 'Airdrop & Burn',
    description: 'Airdrop 1 Pewnicorn to holders who completed a pre-order & Burn all the remaining editions.',
    number: 2, 
    votes: 1259,
    color: "text-red-500"
  },
  {
    name: 'Airdrop & Treasury',
    description: 'Airdrop 1 Pewnicorn to holders who completed a pre-order & put all the remaining editions in treasury.',
    number: 3,
    votes: 30011,
    color: "text-green-500"
  },
]
export default {
    components:{Menu, Footer},
    setup () {
        const state = reactive({
            count: 0,
        })
    
        return {
            ...toRefs(state),
            features
        }
    }
}
</script>

<style lang="scss" scoped>

</style>