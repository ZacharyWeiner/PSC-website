<template>
<Menu />
        <div
        class="h-36 bg-contain bg-center md:h-64"
        style="
            background-image: url('https://slavettes-layers.s3.amazonaws.com/pewnicorns/pewnicorns+header.png');
        "
        ></div>
    <div class="w-full m-1 h-screen text-white text-left bg-gray-900 rounded-xl">
        <div class="flex pt-6 pb-6"> 
            <div class="w-full"></div>
            <div class="w-full text-4xl text-center font-bold -mb-1 pb-1 block bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent" >My Cards</div>
            <div class='pr-4 w-full text-right'><button type="button" @click="fetchCards()" class="w-32 inline-flex text-xs px-4 py-1 border border-transparent font-medium rounded-full shadow-sm  bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-600 bg-white hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 no-break"><div class='w-full mx-auto'>Find My Cards </div></button></div>
        </div>
        <div class="w-full flex grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pb-10 space-x-2">
            <div v-for="card in store.state.bingoCards" 
                :key="card" class="">
                <div class="p-0.5 m-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl">
                <div class="m-0.5 p-0.5 cursor-pointer bg-gray-100 text-gray-100 font-bold rounded-xl text-center flex"
                    @click="setCard(card)"
                    :class="`${ (card.location) === store?.state.selectedBingoCard ? 'ring' : '' }`">
                    <div class=" overflow-hidden">
                        <img class="h-20 mx-auto" :src="'https://berry.relayx.com/' + card.berry.txid  " alt="">   
                    </div>
                    <div class="flex w-full">
                        <div class="w-full  text-2xl pt-1 my-auto text-lg bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Card #{{card.name}}</div> 
                        <button type="button" class="inline-flex items-center px-5 py-2 border border-transparent text-base font-medium rounded-xl shadow-sm bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-600 hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <span class="text-xl text-center font-bold -mb-1 pb-1 block text-white font-bold text-transparent hover:text-white" > Play </span>
                        </button>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
    <Footer></Footer>
</template>

<script>
import { useStore } from 'vuex'
import { useRun } from "./../../../services/wallet.js";
import Menu from "./../../../components/MenuComponent2.vue"
import Footer from '../../../components/Footer.vue';
export default {
    components: {Menu, Footer},
    async setup() {
        const store = useStore()
        const {setJigs} = useRun();
        await setJigs();
        return { store }
    },
    methods: {
        async fetchCards(){
            location.reload();
        },
        setCard(bingoCard) {
            this.$store.commit("setSelectedCard", bingoCard)
            console.log(this.$store.state.selectedBingoCard)
            this.$router.push('/bingo/play')
        }
    }
    

}
</script>