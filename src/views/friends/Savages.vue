<template>
    <div class='text-white min-h-screen'>
        <Menu />
        <div class='grid grid-cols-3'>
            <div v-for="order in orders" :key="order.location" class='col-span-1'>
                <img :src="getBerryUrl(order)" class="w-full" />
               <div class='grid grid-cols-4'  :class='rankClass(order)'>
                    <div class='w-full col-span-2'> <div class='mx-auto'> Edition {{order.props.no}}</div>  </div>
                    <!-- <div class='col-span-1'> <div class='mx-auto'> Rank # {{rankNFT(order)}}</div>  </div> -->
                    <div class='col-span-1'> <div class='mx-auto'> ₿ {{order.satoshis / 100000000}}</div>  </div>
                    
                </div>
                <div class="">
                         <div class='text-4xl pt-2' :class='rankTextClass(order)'>{{getRank(order)}} </div>
                    </div>
                <div class="m-4"> 
                    <div class="m-4"> 
                     <button class="bg-blue-500 rounded-xl text-white p-2 m-2" @click="buy(order)">{{buyButtonText(order)}}</button>
                </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
//import {useRun} from './../services/wallet.js'
//import {useStore} from 'vuex'
import Menu from "./../../components/Menu.vue"
import Footer from "./../../components/Footer.vue"
import axios from "axios";
const Common = "Common";
const Uncomon = "Uncommon"
const Rare = "Rare";
const Epic = "Epic";
const Legendary = "Legendary"

const rank = [Uncomon,Common,Common,Common,Common,Common,Uncomon,Common,Uncomon,Uncomon,Uncomon,Common,Uncomon,Common,Rare,Rare,Epic,Legendary,Common,Uncomon,Common,Common,Common,Common,Uncomon,Uncomon,Common,Common,Common,Common,Common,Rare,Rare,Epic,Uncomon,Common,Common,Common,Uncomon,Uncomon,Common,Common,Common,Common,Uncomon,Common,Uncomon,Common,Common,Uncomon,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Uncomon,Common,Uncomon,Common,Uncomon,Uncomon,Common,Common,Uncomon,Common,Common,Common,Rare,Epic,Legendary,Rare,Common,Uncomon,Common,Common,Uncomon,Common,Uncomon,Common,Common,Common,Common,Common,Common,Uncomon,Uncomon,Common,Uncomon,Uncomon,Uncomon,Uncomon,Common,Uncomon,Uncomon,Uncomon,Uncomon,Uncomon,Rare,Rare,Rare,Rare,Rare,Common,Uncomon,Uncomon,Common,Uncomon,Common,Common,Common,Common,Rare,Epic,Legendary,Uncomon,Uncomon,Uncomon,Uncomon,Common,Uncomon,Uncomon,Uncomon,Uncomon,Common,Uncomon,Uncomon,Common,Uncomon,Common,Uncomon,Common,Uncomon,Common,Common,Common,Uncomon,Common,Uncomon,Common,Common,Common,Common,Uncomon,Common,Uncomon,Uncomon,Common,Common,Common,Common,Uncomon,Common,Uncomon,Uncomon,Uncomon,Uncomon,Uncomon,Uncomon,Uncomon,Epic,Rare,Rare,Legendary,Common,Uncomon,Uncomon,Uncomon,Common,Common,Common,Common,Common,Uncomon,Common,Common,Common,Common,Uncomon,Uncomon,Uncomon,Uncomon,Uncomon,Uncomon,Uncomon,Uncomon,Uncomon,Uncomon,Common,Uncomon,Common,Uncomon,Epic,Rare,Rare,Legendary,Common,Uncomon,Common,Uncomon,Common,Common,Uncomon,Common,Uncomon,Common,Uncomon,Epic,Epic,Rare,Uncomon,Common,Uncomon,Uncomon,Uncomon,Uncomon,Uncomon,Uncomon,Uncomon,Common,Common,Common,Common,Common,Uncomon,Uncomon,Common,Common,Uncomon,Common,Common,Common,Uncomon,Uncomon,Uncomon,Common,Uncomon,Common,Uncomon,Common,Uncomon,Common,Common,Common,Uncomon,Common,Uncomon,Common,Uncomon,Uncomon,Uncomon,Uncomon,Uncomon,Common,Uncomon,Common,Common,Common,Uncomon,Legendary,Legendary,Legendary,Legendary,Common,Uncomon,Common,Common,Uncomon,Common,Common,Common,Uncomon,Common,Common,Uncomon,Common,Uncomon,Uncomon,Uncomon,Uncomon,Uncomon,Common,Uncomon,Common,Uncomon,Epic,Epic,Rare,Legendary,Common,Uncomon,Common,Common,Common,Uncomon,Common,Common,Common,Common,Common,Common,Common,Common,Common,Rare,Rare,Rare,Common,Uncomon,Uncomon,Common,Common,Uncomon,Common,Uncomon,Common,Common,Common,Uncomon,Common,Uncomon,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Uncomon,Uncomon,Common,Common,Common,Common,Uncomon,Common,Common,Common,Rare,Legendary,Rare,Rare,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Uncomon,Common,Uncomon,Uncomon,Uncomon,Common,Common,Common,Uncomon,Rare,Rare,Rare,Legendary,Uncomon,Common,Common,Uncomon,Common,Common,Common,Common,Common,Common,Common,Rare,Rare,Legendary,Uncomon,Common,Uncomon,Common,Uncomon,Common,Uncomon,Common,Uncomon,Common,Uncomon,Common,Uncomon,Uncomon,Common,Uncomon,Common,Common,Common,Common,Uncomon,Common,Common,Uncomon,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Uncomon,Common,Common,Common,Uncomon,Common,Uncomon,Common,Uncomon,Uncomon,Common,Uncomon,Common,Common,Common,Uncomon,Rare,Epic,Legendary,Epic,Uncomon,Common,Common,Uncomon,Common,Common,Common,Common,Uncomon,Common,Uncomon,Common,Common,Common,Common,Uncomon,Common,Common,Uncomon,Common,Uncomon,Uncomon,Common,Common,Rare,Epic,Epic,Legendary,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Rare,Rare,Rare,Uncomon,Common,Common,Common,Uncomon,Uncomon,Uncomon,Common,Uncomon,Uncomon,Common,Common,Common,Common,Common,Common,Common,Common,Uncomon,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Uncomon,Common,Common,Common,Common,Rare,Epic,Rare,Rare,Common,Uncomon,Common,Common,Common,Common,Common,Common,Common,Uncomon,Common,Common,Common,Common,Common,Common,Common,Common,Common,Uncomon,Uncomon,Common,Uncomon,Common,Common,Common,Uncomon,Common,Uncomon,Rare,Epic,Rare,Legendary,Common,Common,Uncomon,Common,Common,Common,Common,Uncomon,Common,Common,Common,Common,Common,Common,Common,Common,Rare,Rare,Rare,Uncomon,Common,Common,Common,Uncomon,Uncomon,Uncomon,Uncomon,Uncomon,Common,Common,Uncomon,Common,Common,Common,Common,Common,Common,Common,Common,Uncomon,Uncomon,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Common,Uncomon,Common,Common,Common,Uncomon,Common,Common,Common,Common,Rare,Rare,Legendary,Epic,Rare,Legendary,Common,Common,Common,Common,Uncomon,Common,Common,Common,Common,Rare,Rare,Uncomon,Uncomon,Rare,Uncomon,Rare,Legendary,Epic,Epic,Uncomon,Common,Uncomon,Common,Uncomon,Uncomon,Uncomon,Uncomon,Uncomon,Uncomon,Uncomon,Epic,Legendary,Legendary,Rare,Uncomon,Rare,Uncomon,Uncomon,Uncomon,Uncomon,Rare,Rare,Uncomon,Uncomon,Common,Uncomon,Uncomon,Uncomon,Uncomon,Uncomon,Uncomon,Uncomon,Common,Uncomon,Uncomon,Common,Common,Common,Common,Uncomon,Uncomon,Uncomon,Uncomon,Common,Uncomon,Uncomon,Uncomon,Uncomon,Uncomon,Rare,Uncomon,Uncomon,Common,Uncomon,Legendary,Legendary,Legendary,Legendary,Uncomon,Uncomon,Uncomon,Uncomon,Uncomon,Uncomon,Uncomon,Uncomon,Uncomon,Uncomon,Uncomon,Uncomon,Common,Uncomon]
export default {
    components: { Menu, Footer },
     async setup () {
        let { data } = await axios.get("https://staging-backend.relayx.com/api/market/6d589398a0b4e83c3100c9b28afa2239be2d21b9080a4c4bcf05767805d637f5_o2/orders");
        let orders  = data.data.orders
        orders.sort((a, b) =>{ 
            let a1 =  parseInt(a.satoshis, 10)
            let b1 =  parseInt(b.satoshis, 10)
            return a1- b1
           });
        const state = reactive({
            count: 0,
            page: 0,
            selectedOrderTxid: "",
            error: ""
        })
    
        return {
            ...toRefs(state),
            orders,
        }
    },
    methods: {
        async buy(order){
            try{
                this.selectedOrderTxid = order.txid;
                let response = await axios.post('https://staging-backend.relayx.com/api/dex/buy', {
                    address: this.$store.state.user_address,
                    location: "6d589398a0b4e83c3100c9b28afa2239be2d21b9080a4c4bcf05767805d637f5_o2",
                    txid: order.txid,
                })
                console.log(response)
                let sendResponse = await window.relayone.send(response.data.data.rawtx)
                console.log(sendResponse)
            }catch(err){this.error = err; alert(err);}
        },
        getRank(nft){
            console.log(nft.props.no)
            let r = rank[nft.props.no]
            return r.toString();
        },
        getBerryUrl(order){
            let suffix = order.berry.txid
            if(suffix){
                return 'https://berry.relayx.com/'+ suffix
            }
            return ''
            
        },
         rankNFT(nft){
             const i = parseInt(nft.props.no)
             let rankSpot = rank.indexOf(i) 
             return rankSpot + 1;
        },
        rankClass(nft){
             let currentRank = this.getRank(nft)
             console.log(currentRank)
             if(currentRank === Legendary) {return "bg-teal-200 text-teal-800"}
            if(currentRank === Legendary) {return "bg-yellow-800 text-yellow-200"}
            if(currentRank === Epic) {return "bg-red-600 text-red-200"}
            if(currentRank === Rare) {return "bg-green-600 text-green-100"}
            if(currentRank === Uncomon) {return "bg-blue-600 text-blue-200"}
            return "bg-gray-700 text-gray-100"
        },
        rankTextClass(nft){
             let currentRank = this.getRank(nft)
             if(currentRank === "Exotic") {return "font-extrabold bg-gradient-to-b from-teal-200 via-indigo-400 to-blue-700 bg-clip-text text-transparent"}
            if(currentRank === Legendary) {return "font-extrabold bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-700 bg-clip-text text-transparent"}
            if(currentRank === Epic) {return "font-extrabold bg-gradient-to-b from-red-200 via-red-400 to-red-700 bg-clip-text text-transparent"}
            if(currentRank === Rare) {return "font-extrabold bg-gradient-to-b from-green-200 via-green-400 to-green-700 bg-clip-text text-transparent"}
            if(currentRank === Uncomon) {return "font-extrabold bg-gradient-to-b from-blue-200 via-blue-400 to-blue-700 bg-clip-text text-transparent"}
            return "font-extrabold bg-gradient-to-b from-gray-200 via-gray-400 to-gray-700 bg-clip-text text-transparent"
        },
        rankText(nft){
            
             let currentRank = this.getRank(nft)
             if(currentRank === "Exotic") {return "Exotic"}
            if(currentRank === Legendary) {return "Legendary"}
            else if(currentRank === Epic) {return "Epic"}
            else if(currentRank === Rare) {return "Rare"}
            else if(currentRank === Uncomon) {return "Uncommon"}
            return "Common"
        },
        resetPage(){
            this.page = 0
        },
        nextPage(){
            this.page = this.page + 1
            console.log(this.page)
        },
        lastPage(){
            if(this.page >= 2){this.page = this.page - 1}
        },
        buyButtonText(order){
            if(this.error !== ""){
                return this.error
            }
            if(order.txid  === this.selectedOrderTxid){
                return "Buying... "
            }
            return "BUY NOW"
        }
    }
}
</script>

<style lang="scss" scoped>

</style>