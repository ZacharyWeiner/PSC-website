<template>
    <div>
        <Menu />
        <div class="relative bg-white">
            <div class="h-56 bg-indigo-600 sm:h-72 lg:absolute lg:left-0 lg:h-full lg:w-1/2">
            <img class="w-full h-full object-cover" src="https://slavettes-layers.s3.amazonaws.com/pewnicorns/corns-gif-2.gif" alt="Support team" />
            </div>
            <div class="relative max-w-7xl mx-auto px-4 py-8 sm:py-12 sm:px-6 lg:py-16">
            <div class="max-w-2xl mx-auto lg:max-w-none lg:mr-0 lg:ml-auto lg:w-1/2 lg:pl-10">
                <h1 class="text-left mt-6 text-5xl font-extrabold text-gray-900 sm:text-4xl">Its Time To Vote</h1>
                <h4 class="text-left mt-6 text-xl font-extrabold text-gray-900 sm:text-xl">We have 3 New Pages:</h4>
                <div class="text-left text-md text-gray-100 ring-1 rounded-xl bg-indigo-600 p-1 m-1"> <span class='font-bold'> 1 - My-Bag: </span> <br/> showing the PRD #NFTs you have, their rank and value. </div>
                <div class="text-left text-md text-gray-100 ring-1 rounded-xl bg-indigo-600 p-1 m-1"> <span class='font-bold'> 2 - Treasury: </span> <br/> showing all the PRD #NFTs the Treasury holds, their rank, value, and how to buy with $POO. </div>
                <div class="text-left text-md text-gray-100 ring-1 rounded-xl bg-indigo-600 p-1 m-1"> <span class='font-bold'> 3 - Orders: </span> <br/> showing the rank and price of all PRD orders on RelayX.com </div>
                <h2 class="text-left mt-6 text-3xl font-extrabold text-gray-900 sm:text-3xl">How Should We Release Them?</h2>
                <p class="text-left mt-6 text-lg text-gray-500"><span class='text-indigo-600 font-bold' >Option 1: </span> Publish All New Pages Friday, April 1.</p>
                <p class="text-left text-lg text-gray-500"><span class='text-indigo-600 font-bold' >Option 2: </span> Publish 1 Page Every Friday, Starting April 1.</p>
                <p class="text-left text-lg text-green-700"><span class='text-green-700 font-bold' >Option 3: </span> Publish Them All Now!</p>
                <div class="mt-8 overflow-hidden">
                <h4 class="text-left mt-6 text-3xl font-extrabold text-gray-900 sm:text-4xl">How To Vote:</h4>
                <div class="text-left text-md text-gray-700">Send $POO To The Address listed below the option you would like to choose before 12PM EST Tuesday MARCH 29th, 2022</div>
                <div class="text-left text-xs text-gray-700">* you may vote for more than one option. </div>
                <dl class="-mx-8 flex flex-wrap">
                    <div class="flex flex-col px-8 pt-8">
                    <dt class="order-2 text-base font-medium text-gray-500">700 Votes</dt>
                    <dd class="order-1 text-5xl font-extrabold text-indigo-600 sm:text-3xl">Option 1</dd>
                    </div>
                    <div class="flex flex-col px-8 pt-8">
                    <dt class="order-2 text-base font-medium text-gray-500">608 Votes </dt>
                    <dd class="order-1 text-5xl font-extrabold text-indigo-600 sm:text-3xl">Option 2</dd>
                    </div>
                    <div class="flex flex-col px-8 pt-8">
                    <dt class="order-2 text-base font-medium text-gray-500">6387 Votes</dt>
                    <dd class="order-1 text-5xl font-extrabold text-indigo-600 sm:text-3xl">Option 3</dd>
                    </div>
                </dl>
                </div>
            </div>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script>
// import { UsersIcon } from '@heroicons/vue/outline'
import { reactive, toRefs } from 'vue'
import Menu from "./../components/Menu.vue"
import Footer from "./../components/Footer.vue"
export default {
    components:{Menu, Footer},
    setup () {
        const state = reactive({
            count: 0,
        })
    
        return {
            ...toRefs(state),
        }
    }
}
</script>

<style lang="scss" scoped>

</style>