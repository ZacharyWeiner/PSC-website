<template>
    <div>
        <Menu />
        <!-- <announcement-banner /> -->
        <home-hero />
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
        <Poo />
        <Claimable></Claimable>
        <Footer />
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import Menu from "./../components/Menu.vue"
import HomeHero from "./../components/HomeHero.vue";
//import AnnouncementBanner from "./../components/AnnouncementBanner.vue";
import Poo from "./../components/Poo.vue"
import Footer from "./../components/Footer.vue"
import Claimable from "./../components/Claimable.vue"
export default {
    components:{Menu, HomeHero, 
    Claimable,
    //AnnouncementBanner, 
    Poo, Footer},
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