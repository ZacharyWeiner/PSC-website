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
import Menu from "../../components/Menu.vue";
let rank = [302,424,154,386,361,33,1,423,107,307,395,139,261,124,330,110,308,343,356,209,326,39,91,418,17,80,102,191,429,208,111,223,305,317,439,165,79,342,422,30,43,60,202,277,344,25,38,61,100,122,145,85,101,192,196,206,337,401,433,68,136,180,250,256,438,45,78,140,378,397,398,147,215,258,390,35,71,77,104,164,297,16,41,83,155,157,228,260,346,366,409,441,2,11,55,141,150,163,268,293,296,230,300,365,408,12,22,53,96,105,112,131,170,175,200,257,272,301,435,8,18,67,172,325,389,168,171,188,214,252,269,287,336,347,369,385,399,415,436,106,178,181,248,312,353,416,32,48,74,204,221,285,306,313,322,331,370,376,405,414,87,103,115,151,199,203,263,298,40,59,70,81,99,162,193,231,232,240,328,335,341,372,402,431,432,44,129,143,146,236,237,242,249,265,283,348,357,381,394,20,27,72,128,243,274,282,295,354,380,403,127,235,247,279,309,387,34,64,73,97,152,173,211,222,227,241,251,304,345,362,425,437,42,56,66,119,212,220,275,286,320,6,7,14,90,135,148,149,219,233,234,319,360,63,117,169,189,262,292,339,352,355,384,406,442,5,19,37,52,109,132,159,167,184,244,288,314,324,364,413,426,10,49,82,84,137,156,190,217,238,290,299,329,379,392,428,23,28,29,46,95,121,161,179,213,218,225,276,280,411,57,113,123,166,182,194,197,216,271,289,396,62,69,75,86,92,114,226,284,310,315,3,21,24,31,51,76,89,94,176,198,229,259,270,294,368,410,440,47,116,332,350,373,400,407,65,153,160,174,205,255,266,281,303,323,349,367,371,375,377,388,419,420,421,434,15,185,13,50,195,311,316,321,327,340,393,417,9,26,54,93,125,130,224,264,318,351,363,120,134,144,177,186,210,253,267,273,333,4,88,98,138,187,239,246,334,338,383,404,412,108,118,126,133,158,201,207,278,291,358,359,391,183,254,382,443,58,245,374,430,36,142,427,444]
export default {
    components: {Menu},
    async setup () {
        let { data } = await axios.get("https://staging-backend.relayx.com/api/market/fd0ffe5908cf88293ecd4dd781e9af1aac8bab9e0ba53867fbcbde07b80a309a_o2/orders");
        let orders_raw  = data.data.orders
        let orders = orders_raw.filter((o) => rank.indexOf(o.props.no) < 1499)
        orders.sort((a, b) =>{ 
            let a1 =  parseInt(a.satoshis, 10)
            let b1 =  parseInt(b.satoshis, 10)
            return a1- b1
           });
        const state = reactive({
            count: 0,
            page: 0,
            buyText: "BUY NOW",
            selectedOrderLocation: "",
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
                    location: "fd0ffe5908cf88293ecd4dd781e9af1aac8bab9e0ba53867fbcbde07b80a309a_o2",
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
            if(currentRank <= 66) {return "bg-red-600 text-red-200"}
            if(currentRank <= 133) {return "bg-green-600 text-green-100"}
            if(currentRank <= 222) {return "bg-blue-600 text-blue-200"}
            return "bg-gray-700 text-gray-100"
        },
        rankTextClass(nft){
             let currentRank = this.rankNFT(nft)
             if(currentRank <= 4) {return "font-extrabold bg-gradient-to-b from-teal-200 via-indigo-400 to-blue-700 bg-clip-text text-transparent"}
            if(currentRank <= 20) {return "font-extrabold bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-700 bg-clip-text text-transparent"}
            if(currentRank <= 66) {return "font-extrabold bg-gradient-to-b from-red-200 via-red-400 to-red-700 bg-clip-text text-transparent"}
            if(currentRank <= 133) {return "font-extrabold bg-gradient-to-b from-green-200 via-green-400 to-green-700 bg-clip-text text-transparent"}
            if(currentRank <= 222) {return "font-extrabold bg-gradient-to-b from-blue-200 via-blue-400 to-blue-700 bg-clip-text text-transparent"}
            return "font-extrabold bg-gradient-to-b from-gray-200 via-gray-400 to-gray-700 bg-clip-text text-transparent"
        },
        rankText(nft){
            
             let currentRank = this.rankNFT(nft)
             if(currentRank <= 4) {return "Exotic"}
            if(currentRank <= 20) {return "Legendary"}
            else if(currentRank <= 66) {return "Epic"}
            else if(currentRank <= 133) {return "Rare"}
            else if(currentRank <= 222) {return "Uncommon"}
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