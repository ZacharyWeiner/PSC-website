<template>
    <div class='text-white min-h-screen'>
        <Menu />
        <div class='grid grid-cols-3'>
            <div v-for="nft in selected" :key="nft.location" class='col-span-1'>
                <img :src="`https://berry.relayx.com/${nft.berry.txid}`" />
                Rank: {{getRank(nft)}}
            </div>
        </div>
        <Footer />
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
//import {useRun} from './../services/wallet.js'
import {useStore} from 'vuex'
import Menu from "./../../components/Menu.vue"
import Footer from "./../../components/Footer.vue"
const Common = "Common";
const Uncomon = "Uncommon"
const Rare = "Rare";
const Epic = "Epic";
const Legendary = "Legendary"

const rank = [Uncomon,Common,Common,Common,Common,Common,Uncomon,Common,Uncomon,Uncomon,Uncomon,Common,Uncomon,Common,Rare,Rare,Epic,Legendary,Common,Uncomon,Common,Common,Common,Common,Uncomon,Uncomon,Common,Common,Common,Common,Common,Rare,Rare,Epic,Uncomon,Common,Common,Common,Uncomon,Uncomon,Common,Common,Common,Common,Uncomon,Common,Uncomon,Common,Common,Uncomon,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Uncomon,Common,Uncomon,Common,Uncomon,Uncomon,Common,Common,Uncomon,Common,Common,Common,Rare,Epic,Legendary,Rare,Common,Uncomon,Common,Common,Uncomon,Common,Uncomon,Common,Common,Common,Common,Common,Common,Uncomon,Uncomon,Common,Uncomon,Uncomon,Uncomon,Uncomon,Common,Uncomon,Uncomon,Uncomon,Uncomon,Uncomon,Rare,Rare,Rare,Rare,Rare,Common,Uncomon,Uncomon,Common,Uncomon,Common,Common,Common,Common,Rare,Epic,Legendary,Uncomon,Uncomon,Uncomon,Uncomon,Common,Uncomon,Uncomon,Uncomon,Uncomon,Common,Uncomon,Uncomon,Common,Uncomon,Common,Uncomon,Common,Uncomon,Common,Common,Common,Uncomon,Common,Uncomon,Common,Common,Common,Common,Uncomon,Common,Uncomon,Uncomon,Common,Common,Common,Common,Uncomon,Common,Uncomon,Uncomon,Uncomon,Uncomon,Uncomon,Uncomon,Uncomon,Epic,Rare,Rare,Legendary,Common,Uncomon,Uncomon,Uncomon,Common,Common,Common,Common,Common,Uncomon,Common,Common,Common,Common,Uncomon,Uncomon,Uncomon,Uncomon,Uncomon,Uncomon,Uncomon,Uncomon,Uncomon,Uncomon,Common,Uncomon,Common,Uncomon,Epic,Rare,Rare,Legendary,Common,Uncomon,Common,Uncomon,Common,Common,Uncomon,Common,Uncomon,Common,Uncomon,Epic,Epic,Rare,Uncomon,Common,Uncomon,Uncomon,Uncomon,Uncomon,Uncomon,Uncomon,Uncomon,Common,Common,Common,Common,Common,Uncomon,Uncomon,Common,Common,Uncomon,Common,Common,Common,Uncomon,Uncomon,Uncomon,Common,Uncomon,Common,Uncomon,Common,Uncomon,Common,Common,Common,Uncomon,Common,Uncomon,Common,Uncomon,Uncomon,Uncomon,Uncomon,Uncomon,Common,Uncomon,Common,Common,Common,Uncomon,Legendary,Legendary,Legendary,Legendary,Common,Uncomon,Common,Common,Uncomon,Common,Common,Common,Uncomon,Common,Common,Uncomon,Common,Uncomon,Uncomon,Uncomon,Uncomon,Uncomon,Common,Uncomon,Common,Uncomon,Epic,Epic,Rare,Legendary,Common,Uncomon,Common,Common,Common,Uncomon,Common,Common,Common,Common,Common,Common,Common,Common,Common,Rare,Rare,Rare,Common,Uncomon,Uncomon,Common,Common,Uncomon,Common,Uncomon,Common,Common,Common,Uncomon,Common,Uncomon,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Uncomon,Uncomon,Common,Common,Common,Common,Uncomon,Common,Common,Common,Rare,Legendary,Rare,Rare,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Uncomon,Common,Uncomon,Uncomon,Uncomon,Common,Common,Common,Uncomon,Rare,Rare,Rare,Legendary,Uncomon,Common,Common,Uncomon,Common,Common,Common,Common,Common,Common,Common,Rare,Rare,Legendary,Uncomon,Common,Uncomon,Common,Uncomon,Common,Uncomon,Common,Uncomon,Common,Uncomon,Common,Uncomon,Uncomon,Common,Uncomon,Common,Common,Common,Common,Uncomon,Common,Common,Uncomon,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Uncomon,Common,Common,Common,Uncomon,Common,Uncomon,Common,Uncomon,Uncomon,Common,Uncomon,Common,Common,Common,Uncomon,Rare,Epic,Legendary,Epic,Uncomon,Common,Common,Uncomon,Common,Common,Common,Common,Uncomon,Common,Uncomon,Common,Common,Common,Common,Uncomon,Common,Common,Uncomon,Common,Uncomon,Uncomon,Common,Common,Rare,Epic,Epic,Legendary,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Rare,Rare,Rare,Uncomon,Common,Common,Common,Uncomon,Uncomon,Uncomon,Common,Uncomon,Uncomon,Common,Common,Common,Common,Common,Common,Common,Common,Uncomon,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Uncomon,Common,Common,Common,Common,Rare,Epic,Rare,Rare,Common,Uncomon,Common,Common,Common,Common,Common,Common,Common,Uncomon,Common,Common,Common,Common,Common,Common,Common,Common,Common,Uncomon,Uncomon,Common,Uncomon,Common,Common,Common,Uncomon,Common,Uncomon,Rare,Epic,Rare,Legendary,Common,Common,Uncomon,Common,Common,Common,Common,Uncomon,Common,Common,Common,Common,Common,Common,Common,Common,Rare,Rare,Rare,Uncomon,Common,Common,Common,Uncomon,Uncomon,Uncomon,Uncomon,Uncomon,Common,Common,Uncomon,Common,Common,Common,Common,Common,Common,Common,Common,Uncomon,Uncomon,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Uncomon,Common,Common,Common,Uncomon,Common,Common,Common,Common,Rare,Rare,Legendary,Epic,Rare,Legendary,Common,Common,Common,Common,Uncomon,Common,Common,Common,Common,Rare,Rare,Uncomon,Uncomon,Rare,Uncomon,Rare,Legendary,Epic,Epic,Uncomon,Common,Uncomon,Common,Uncomon,Uncomon,Uncomon,Uncomon,Uncomon,Uncomon,Uncomon,Epic,Legendary,Legendary,Rare,Uncomon,Rare,Uncomon,Uncomon,Uncomon,Uncomon,Rare,Rare,Uncomon,Uncomon,Common,Uncomon,Uncomon,Uncomon,Uncomon,Uncomon,Uncomon,Uncomon,Common,Uncomon,Uncomon,Common,Common,Common,Common,Uncomon,Uncomon,Uncomon,Uncomon,Common,Uncomon,Uncomon,Uncomon,Uncomon,Uncomon,Rare,Uncomon,Uncomon,Common,Uncomon,Legendary,Legendary,Legendary,Legendary,Uncomon,Uncomon,Uncomon,Uncomon,Uncomon,Uncomon,Uncomon,Uncomon,Uncomon,Uncomon,Uncomon,Uncomon,Common,Uncomon]
export default {
    components: { Menu, Footer },
    async setup () {
        let store = useStore();
        if(!store.state.user_address){return}
        let walletJSON  = await fetch('https://staging-backend.relayx.com/api/user/balance2/' + store.state.user_address)
        let response_data = await walletJSON.json()
        console.log(response_data)
        let collectibles = response_data.data['collectibles'];
        let selected = collectibles.filter(c => c.origin === '6d589398a0b4e83c3100c9b28afa2239be2d21b9080a4c4bcf05767805d637f5_o2') //'6d589398a0b4e83c3100c9b28afa2239be2d21b9080a4c4bcf05767805d637f5_o2')
        console.log(selected);
        const state = reactive({
            count: 0,
        })
    
        return {
            ...toRefs(state), selected
        }
    },
    methods: {
        getRank(nft){
            console.log(nft.props.no)
            let r = rank[nft.props.no]
            return r.toString();
        }
    }
}
</script>

<style lang="scss" scoped>

</style>