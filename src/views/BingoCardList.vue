<template>
<Menu />
        <div
        class="h-36 bg-contain bg-center md:h-64"
        style="
            background-image: url('https://slavettes-layers.s3.amazonaws.com/pewnicorns/pewnicorns+header.png');
        "
        ></div>
    <div class="w-full m-1 text-white text-left bg-gray-700 rounded-xl">
        <div class="w-full text-center text-3xl font-bold" >My Cards</div>
        <div class="w-full grid grid-cols2 md:grid-cols-4 lg:grid-cols-5">
            <div v-for="card in store.state.bingoCards" 
                :key="card">
                <div class="p-1 m-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl">
                <div class="m-1 p-1 cursor-pointer bg-white text-gray-900 font-bold rounded-xl text-center"
                    @click="setCard(card)"
                    :class="`${ (card.location) === store.state.selectedBingoCard ? 'ring' : '' }`">
                    <img class="h-80 mx-auto" :src="'https://berry.relayx.com/' + card.berry.txid  " alt="">   
                    <div class="pt-1 text-lg">{{card.name}}</div> 
                    <button type="button" class="inline-flex items-center px-5 py-2 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-gradient-to-r from-blue-400 to-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Use Card</button>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex'
import { useRun } from "./../services/wallet.js";
import Menu from "./../components/Menu.vue"
export default {
    components: {Menu},
    async setup() {
        const store = useStore()
        const {setJigs} = useRun();
        await setJigs();
        return { store }
    },
    methods: {
        setCard(bingoCard) {
            this.$store.commit("setSelectedCard", bingoCard)
            console.log(this.$store.state.selectedBingoCard)
            this.$router.push('bingoCard')
        }
    }
    

}
</script>