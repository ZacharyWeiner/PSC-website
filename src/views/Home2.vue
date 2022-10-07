<template>
    <div>
        <Menu />
        <announcement-banner />
        <home-hero />
        <div class="grid grid-cols-3 lg:grid-cols-5">
            <div class="col-span-3 lg:col-span-3">
                <!-- <div class="text-white font-black px-4 py-5 sm:px-6">
                    <h3 class="text-xl font-medium leading-6  underline">Quick Links</h3>
                </div>
                <div class="">
                    <a href="https://www.relayx.com/market/POO" class="w-full my-1 flex items-center justify-center border border-transparent text-base font-medium rounded-md text-indigo-900 bg-indigo-100 hover:bg-indigo-200 md:text-lg"> Whats Hot On Relay</a>
                    <a href="https://www.relayx.com/market/POO" class="w-full my-1 flex items-center justify-center border border-transparent text-base font-medium rounded-md text-indigo-900 bg-indigo-100 hover:bg-indigo-200 md:text-lg"> APE FLOOR</a>
                    <a href="https://www.relayx.com/market/POO" class="w-full my-1 flex items-center justify-center border border-transparent text-base font-medium rounded-md text-indigo-900 bg-indigo-100 hover:bg-indigo-200 md:text-lg"> FROG FLOOR</a>
                </div> -->
                <Poo />
            </div>
            <div class="col-span-3 lg:col-span-2 overflow-y-scroll">
                <div class="grid grid-cols-1 m-2 text-3xl font-extrabold text-gray-200 bg-gray-800 rounded-xl pl-4 mb-2">
                    <router-link class="flex" to="https://bitchatnitro.com/channels/pewnicorn-social-club">     
                        <div class="underline"> 
                            Latest From Bitchat Nitro
                        </div>
                        <div><ExternalLinkIcon class="-mr-1 ml-3 my-auto h-5 w-5 text-gray-400" aria-hidden="true" /></div>
                    </router-link> 
                    <BitChat count="6" />
                </div>
            </div>
        </div>
        <div class="bg-white">
            <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <div class="bg-indigo-700 rounded-lg shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
                <div class="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
                <div class="lg:self-center text-left">
                    <h2 class=" md:text-left text-3xl font-extrabold text-white sm:text-4xl">
                    <span class="block">Friends With  Benefits </span>
                    <!-- <span class="block">With Ranks &amp; Rarity</span> -->
                    </h2>
                    <p class="mt-4 text-lg leading-6 text-indigo-200 md:text-left">The only place to see Run NFTs with rank &amp; rarity, and buy your favorite NFTs with a single click. </p>
                    <router-link to="/friends" class="mt-8 bg-white border border-transparent rounded-md shadow px-5 py-3 inline-flex items-center text-base font-medium text-indigo-600 hover:bg-indigo-50">Check Out Our Friends</router-link>
                </div>
                </div>
                <div class="-mt-12 aspect-w-5 aspect-h-3 md:aspect-w-2 md:aspect-h-1">
                <img class="transform rounded-md object-cover object-left-top sm:translate-x-16 lg:translate-y-20" src="https://slavettes-layers.s3.amazonaws.com/pewnicorns/2268.png" alt="App screenshot" />
                </div>
            </div>
            </div>
        </div>
        <bingo-announcement></bingo-announcement>
         
         
         <div class="bg-black">
            <div class="mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
                <div class="text-left">
                    <h2 class="text-base font-semibold text-indigo-600 uppercase tracking-wide">Episode 1 Replay</h2>
                    <p class="mt-2 text-3xl font-extrabold text-gray-200">Pewnicorn Concert Series</p>
                    <p class="mt-2 text-lg text-gray-500">Replay: Live Event March 18th 2020.</p>
                    <p class='mt-4 text-gray-300 uppercase'></p> 
                    <h2 class="text-base font-semibold text-indigo-500 uppercase tracking-wide">Artists Contact Us On Twitter:</h2>
                    <a class="text-base font-semibold text-indigo-300 uppercase tracking-wide" href="https://www.twitter.com/iampewnicorn" target="_blank" rerel noopener > @iAmPewnicorn </a>
                </div>
                <div class="lg:mt-0 lg:col-span-2">
                    <iframe width="100%" height="500" src="https://www.youtube.com/embed/R4ECXxyhX5M" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
            </div>
        </div>
        <!-- <Claimable></Claimable> -->
        <Footer />
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import Menu from "./../components/MenuComponent2.vue"
import HomeHero from "./../components/HomeHero.vue";
import AnnouncementBanner from "./../components/AnnouncementBanner.vue";
import Poo from "./../components/Poo.vue"
import Footer from "./../components/Footer.vue"
//import Claimable from "./../components/Claimable.vue"
import BingoAnnouncement from "./../components/BingoAnnouncement.vue"
import BitChat from '../components/controls/BitChat.vue';
import { ExternalLinkIcon } from '@heroicons/vue/solid';
export default {
    components:{ Menu, HomeHero, ExternalLinkIcon,
    //Claimable,
    AnnouncementBanner, BingoAnnouncement, Poo, Footer, BitChat },
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