<template>
    <div class="text-white">
        <announcement-banner />
         <Menu />
         <div v-if="isLoading" class="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
                <span class='text-3xl'> 👀</span>
                <h2 class="text-3xl font-extrabold tracking-tight pl-3 text-2xl lg:text-4xl font-extrabold bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-700 bg-clip-text text-transparent sm:text-4xl">
                    <span class="block">Loading </span>
                    <span class="block"> ¯\_(ツ)_/¯</span>
                </h2>
            </div>
            <h2 class="text-3xl font-extrabold tracking-tight pl-3 pt-12 text-2xl lg:text-4xl font-extrabold bg-gradient-to-b from-blue-200 via-teal-400 to-purple-700 bg-clip-text text-transparent sm:text-4xl">
                    <span class="block">Buy A {{store.state.marketContractName}} </span>
                </h2>
       <div v-if="orders?.length > 0" class="grid grid-cols-1 lg:grid-cols-4 p-12">
           <div v-for="(order, index) in orders" :key="index" class="col-span-1 mb-4 mx-1 bg-gray-900 rounded p-1">
            <!-- <div class='grid grid-cols-4'  >
                    
                    <div class='col-span-1'>   </div>
                    <div class='col-span-1 text-right pr-1 font-bold '><div>Price: </div> <div class='mx-auto'> ₿ {{order.satoshis / 100000000}}</div>  </div>
                </div> -->
               <img :src="getBerryUrl(order)" class="w-full rounded-xl" />
               
                <!-- <div class="bg-black">
                    <div class='text-4xl pt-2' :class='rankTextClass(order)'>{{rankText(order)}} </div>
                    </div> -->
                <div class="m-4 rounded"> 
                    
                        <button class="w-full text-white bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-bold rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" @click="buy(order)">{{buyButtonText(order)}} ₿ {{order.satoshis / 100000000}}</button>
                    
                </div>
           </div>
       </div>
       <div v-else>
        <div class="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
                <span class='text-3xl'> 👀</span>
                <h2 class="text-3xl font-extrabold tracking-tight pl-3 text-2xl lg:text-4xl font-extrabold bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-700 bg-clip-text text-transparent sm:text-4xl">
                    <span class="block">There Arent Any Available </span>
                    <span class="block"> ¯\_(ツ)_/¯</span>
                </h2>
            </div>
       </div>
       <Footer />
    </div>
</template>
<script>
import { reactive, toRefs, ref } from 'vue'
import { useRouter } from "vue-router"
import  axios from "axios";
import Menu from "./../../components/MenuComponent2.vue"
import AnnouncementBanner from "./../../components/AnnouncementBanner.vue"
import Footer from "./../../components/Footer.vue";
import { useStore } from "vuex";

export default {
   components:{Menu, AnnouncementBanner, Footer},
     async setup () {
        let hasLoaded = ref(false);
        let store = useStore();
        if(store.state.marketContractLocation === ""){
            let router = useRouter()
            router.push('/market-selection');
            return
        }
        let orders = ref([]);
        let queryData = async () => {
            let { data } = await axios.get(`https://staging-backend.relayx.com/api/market/${store.state.marketContractLocation}/orders`);
            let orders = data.data.orders;
            console.log(orders);
            orders.sort((a, b) =>{ 
                let a1 =  parseInt(a.satoshis, 10)
                let b1 =  parseInt(b.satoshis, 10)
                return a1- b1
            });
            return orders
        }
        orders.value = await queryData();
        const state = reactive({
            count: 0, 
            selectedOrderTxid: "",
            error: "",
        })
        hasLoaded = true;
        return {
            ...toRefs(state),
            orders,
            hasLoaded,
            store,
        }
    },
    methods:{
        async buy(order){
            try{
            this.selectedOrderTxid = order.txid
             let response = await axios.post('https://staging-backend.relayx.com/api/dex/buy', {
                    address: this.$store.state.user_address,
                    location: this.$store.state.marketContractLocation,
                    txid: order.txid,
                })
                console.log(response)
                let sendResponse = await window.relayone.send(response.data.data.rawtx)
                console.log(sendResponse)
                window.location.reload();
                }catch(err){
                    this.error = err
                    alert(err);
                }
        },
        getBerryUrl(order){
            if(order.berry?.txid){
                let suffix = order.berry.txid
                if(suffix){
                    return 'https://berry.relayx.com/'+ suffix
                }
                return ''
            }else{
                return `${this.$store.state.marketContractImageUrl}`
            }
            
        },
         rankNFT(nft){
             const i = parseInt(nft.edition, 10) 
             return i;
        },
        rankClass(nft){
             let currentRank = this.rankNFT(nft)
             if(currentRank <= 8) {return "bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 text-teal-800 rounded-t-xl"}
            if(currentRank <= 40) {return "bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 text-gray-100 rounded-t-xl"}
            if(currentRank <= 120) {return "bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-gray-100 rounded-t-xl"}
            if(currentRank <= 240) {return "bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-gray-100 shadow-xl rounded-t-xl"}
            if(currentRank <= 400) {return "bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-gray-100 shadow-xl rounded-t-xl"}
            return "bg-gradient-to-b from-gray-400 via-gray-500 to-gray-600 text-gray-100 rounded-t-xl"
        },
        rankTextClass(nft){
             let currentRank = this.rankNFT(nft)
             if(currentRank <= 8) {return "font-extrabold bg-gradient-to-b from-teal-200 via-indigo-400 to-blue-700 bg-clip-text text-transparent"}
            if(currentRank <= 40) {return "font-extrabold bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-700 bg-clip-text text-transparent"}
            if(currentRank <= 120) {return "font-extrabold bg-gradient-to-b from-red-200 via-red-400 to-red-700 bg-clip-text text-transparent"}
            if(currentRank <= 240) {return "font-extrabold bg-gradient-to-b from-green-200 via-green-400 to-green-700 bg-clip-text text-transparent"}
            if(currentRank <= 400) {return "font-extrabold bg-gradient-to-b from-blue-200 via-blue-400 to-blue-700 bg-clip-text text-transparent"}
            return "font-extrabold bg-gradient-to-b from-gray-200 via-gray-400 to-gray-700 bg-clip-text text-transparent"
        },
        rankText(nft){
            
             let currentRank = this.rankNFT(nft)
             if(currentRank <= 8) {return "Exotic"}
            if(currentRank <= 40) {return "Legendary"}
            else if(currentRank <= 120) {return "Epic"}
            else if(currentRank <= 240) {return "Rare"}
            else if(currentRank <= 400) {return "Uncommon"}
            return "Common"
        },
        buyButtonText(order){
            if(this.error !== ""){
                return this.error
            }
            if(order.txid  === this.selectedOrderTxid){
                return "Buying... "
            }
            return "BUY NOW"
        },
        computed:{
            isLoading(){
                if(!this.hasLoaded){return false}
                return false;
            },
            ordersToShow(){
                console.log("Orders at call to show", this.orders);
                return this.orders
            },
            contractName(){
                return this.$store.state.marketContractName;
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>