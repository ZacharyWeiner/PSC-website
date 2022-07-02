<template>
   <Menu />
        <div
        class="h-36 bg-contain bg-center md:h-64"
        style="
            background-image: url('https://slavettes-layers.s3.amazonaws.com/pewnicorns/pewnicorns+header.png');
        "
        ></div>
    <div class="flex">
        <div class="w-full"></div>
        <div class=""><button @click="lastPage" class="p-2 m-2 text-white text-xl bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl"> Back </button></div>
        <div class=""><button @click="nextPage" class="p-2 m-2 text-white text-xl bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl"> Next </button></div>
        <div class="w-full"></div>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-4 ">
           <div v-for="(order, index) in orderedNFTs" :key="index" class="col-span-1 mb-4 mx-1 bg-gray-900 rounded">
               <img :src="getBerryUrl(order)" class="w-full" />
               <div class='grid grid-cols-4'  :class='rankClass(order)'>
                    <div class='w-full col-span-2'> <div class='mx-auto'> Edition {{order.props.no}}</div>  </div>
                    <div class='col-span-1'> <div class='mx-auto'> Rank # {{rankNFT(order)}}</div>  </div>
                    <div class='col-span-1'> <div class='mx-auto'> ₿ {{order.satoshis / 100000000}}</div>  </div>
                    
                </div>
                <div class="">
                         <div class='text-4xl pt-2' :class='rankTextClass(order)'>{{rankText(order)}} </div>
                    </div>
                <div class="m-4"> 
                    <div class="m-4"> 
                        <button class="bg-blue-500 rounded-xl text-white p-2 m-2" @click="buy(order)">{{buyButtonText(order)}}</button>
                    </div>
                </div>
           </div>
       </div>
       <div class="flex">
        <div class="w-full"></div>
        <div class=""><button @click="lastPage" class="p-2 m-2 text-white text-xl bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl"> Back </button></div>
        <div class=""><button @click="nextPage" class="p-2 m-2 text-white text-xl bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl"> Next </button></div>
        <div class="w-full"></div>
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import  axios from "axios";
import Menu from "./../../components/MenuComponent2.vue";
let rank = [71,285,40,341,260,160,327,9,4,353,310,14,19,372,52,96,378,352,268,367,6,152,386,24,27,61,63,158,159,270,171,17,22,64,217,263,276,284,299,78,85,165,56,181,188,235,237,242,281,333,20,37,122,196,247,248,228,343,381,38,76,100,214,227,275,51,92,163,173,141,146,207,236,359,364,62,186,194,388,397,31,70,175,178,192,200,205,238,297,302,303,380,384,41,59,87,89,101,269,368,374,11,36,67,95,102,126,153,164,195,229,283,298,351,355,356,23,103,116,140,271,322,348,91,94,125,138,144,170,213,215,221,246,266,360,395,107,108,239,259,292,346,375,12,49,88,97,219,224,233,274,291,312,321,5,8,79,251,309,13,18,114,120,142,193,254,261,294,320,387,393,399,54,115,133,201,267,10,104,148,169,279,313,330,366,383,135,198,3,34,39,47,80,82,121,139,149,167,182,206,218,234,250,265,282,306,363,376,106,252,278,318,46,57,130,162,191,222,226,232,243,244,305,308,328,335,338,347,349,362,377,394,68,72,143,155,197,304,331,339,379,1,65,74,75,86,98,119,123,129,145,256,289,317,326,361,35,55,109,176,231,262,288,316,323,358,390,29,110,117,128,172,174,179,190,208,212,216,241,272,340,345,373,184,7,15,26,84,105,131,156,189,204,230,253,264,295,311,324,332,344,365,371,382,385,396,73,112,113,147,168,202,280,290,337,389,391,392,210,255,25,42,58,60,69,81,99,124,127,154,240,257,293,300,301,354,336,33,43,53,132,137,161,277,325,334,350,177,185,245,48,187,209,211,223,249,307,319,370,398,357,44,83,118,220,287,28,66,77,286,2,93,111,199,203,315,329,30,134,296,314,32,90,150,183,225,136,166,369,16,45,50,157,342,151,273,180,258,21]
export default {
    components: {Menu},
    async setup () {
        let { data } = await axios.get("https://staging-backend.relayx.com/api/market/2af7f18a34d857de734852eb6cb34f6b796d97d0b8aef626487d3cff32781db4_o2/orders");
        let orders_raw  = data.data.orders
        console.log(orders)
        let orders = orders_raw.filter((o) => rank.indexOf(o.props.no) < 1499)
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
    methods:{
        async buy(order){
            try{
            this.selectedOrderTxid = order.txid
             let response = await axios.post('https://staging-backend.relayx.com/api/dex/buy', {
                    address: this.$store.state.user_address,
                    location: "2af7f18a34d857de734852eb6cb34f6b796d97d0b8aef626487d3cff32781db4_o2",
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
             let currentRank = this.rankNFT(nft)
             if(currentRank <= 4) {return "bg-teal-200 text-teal-800"}
            if(currentRank <= 20) {return "bg-yellow-800 text-yellow-200"}
            if(currentRank <= 60) {return "bg-red-600 text-red-200"}
            if(currentRank <= 120) {return "bg-green-600 text-green-100"}
            if(currentRank <= 200) {return "bg-blue-600 text-blue-200"}
            return "bg-gray-700 text-gray-100"
        },
        rankTextClass(nft){
             let currentRank = this.rankNFT(nft)
             if(currentRank <= 4) {return "font-extrabold bg-gradient-to-b from-teal-200 via-indigo-400 to-blue-700 bg-clip-text text-transparent"}
            if(currentRank <= 20) {return "font-extrabold bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-700 bg-clip-text text-transparent"}
            if(currentRank <= 60) {return "font-extrabold bg-gradient-to-b from-red-200 via-red-400 to-red-700 bg-clip-text text-transparent"}
            if(currentRank <= 120) {return "font-extrabold bg-gradient-to-b from-green-200 via-green-400 to-green-700 bg-clip-text text-transparent"}
            if(currentRank <= 200) {return "font-extrabold bg-gradient-to-b from-blue-200 via-blue-400 to-blue-700 bg-clip-text text-transparent"}
            return "font-extrabold bg-gradient-to-b from-gray-200 via-gray-400 to-gray-700 bg-clip-text text-transparent"
        },
        rankText(nft){
            
             let currentRank = this.rankNFT(nft)
             if(currentRank <= 4) {return "Exotic"}
            if(currentRank <= 20) {return "Legendary"}
            else if(currentRank <= 60) {return "Epic"}
            else if(currentRank <= 120) {return "Rare"}
            else if(currentRank <= 200) {return "Uncommon"}
            return "Common"
        },
        resetPage(){
            this.page = 0
        },
        nextPage(){
            this.page = this.page + 1
            console.log(this.page)
            window.scrollTo(0,0);
        },
        lastPage(){
            if(this.page >= 1){this.page = this.page - 1}
            window.scrollTo(0,0);
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
    },
    computed:{
        orderedNFTs(){
           let pageStart = 0;
           let pageEnd =20;
           if(this.page >= 1) {
               pageStart = (this.page * 20);
               pageEnd = pageStart + 20;
           }
           return this.orders.slice(pageStart, pageEnd)
        },
    }
}
</script>

<style lang="scss" scoped>

</style>