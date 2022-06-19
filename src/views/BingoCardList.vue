<template>
    <div class="w-full m-1 text-white">
        <div v-for="card in store.state.bingoCards" 
            :key="card">
            <!-- {{card}} -->
            

            <div class="m-1 flex cursor-pointer"
                @click="setCard(card)"
                :class="`${ (card.location) === store.state.selectedBingoCard ? 'ring' : '' }`">
                <img class="h-80" :src="'https://berry.relayx.com/' + card.berry.txid  " alt="">    
                <span>{{card.name}}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex'

export default {
    setup() {
        const store = useStore()

        
    

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