<template>
    <div class="text-white">
         <Menu />
        <announcement-banner />
        <div
        class="h-36 bg-contain bg-center md:h-64"
        style="
            background-image: url('https://slavettes-layers.s3.amazonaws.com/pewnicorns/pewnicorns+header.png');
        "
        ></div>
        <div v-if="orders.length === 0" >
             <div class="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
                <span class='text-3xl'> 👀</span>
                <h2 class="text-3xl font-extrabold tracking-tight pl-3 text-2xl lg:text-4xl font-extrabold bg-gradient-to-b from-red-200 via-red-400 to-red-700 bg-clip-text text-transparent sm:text-4xl">
                    <span class="block">Relay's Orderbook Looks Empty AF</span>
                    <span class="block">Everyone is Playing </span>
                </h2>
               
            </div>
            <!-- <div class='m-2'>
             <router-link to="/bingo/cards/buy-with-poo" class="bg-gradient-to-r from-blue-400 through-indigo-300 to-indigo-600 rounded-xl text-white p-2 m-2" >Buy with $POO </router-link>
            </div> -->
           </div>
       <div class="grid grid-cols-1 lg:grid-cols-4 ">
           
           <div v-for="(order, index) in orders" :key="index" class="col-span-1 mb-4 mx-1 bg-gray-900 rounded">
               <img :src="getBerryUrl(order)" class="w-full" />
               <!-- <div class='grid grid-cols-4'  :class='rankClass(order)'>
                    <div class='w-full col-span-2'> <div class='mx-auto'> Edition {{order.name}}</div>  </div>
                    <div class='col-span-1'> <div class='mx-auto'> Rank # {{rankNFT(order)}}</div>  </div>
                    <div class='col-span-1'> <div class='mx-auto'> ₿ {{order.satoshis / 100000000}}</div>  </div>
                    
                </div> -->
                <div class="">
                    <!-- <div class='text-4xl pt-2' :class='rankTextClass(order)'>{{rankText(order)}} </div> -->
                    </div>
                    <div class="m-4"> {{order.seller}} </div>
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
//const rank = [46,227,138,611,670,633,688,253,727,475,521,20,620,2,567,226,478,785,739,777,455,78,126,173,112,328,572,674,473,510,752,407,471,230,148,568,249,287,122,180,579,512,8,373,719,73,149,574,596,619,124,603,334,699,641,683,145,50,657,59,506,518,104,347,225,765,405,192,31,283,340,592,77,81,15,44,242,361,262,311,514,585,352,394,243,418,788,308,154,498,530,55,720,34,402,649,312,446,336,780,280,150,737,738,800,128,37,415,151,257,791,69,337,653,479,701,799,759,733,24,299,447,56,393,631,504,525,259,680,769,187,428,188,338,452,526,100,664,772,175,672,286,551,566,377,684,135,224,38,693,324,583,171,120,536,160,406,355,39,107,784,10,571,569,655,401,232,410,244,327,576,346,753,119,49,588,774,662,645,456,200,632,730,235,234,276,783,558,70,767,764,184,723,156,214,712,640,792,480,679,339,441,527,284,165,228,575,212,306,350,72,342,365,349,634,495,489,416,499,84,429,539,271,159,209,304,30,207,166,132,99,217,22,3,219,345,177,629,179,431,617,189,667,615,90,494,636,143,735,444,469,322,330,191,695,724,787,313,476,556,378,474,651,779,208,643,309,237,594,432,541,609,412,57,486,732,425,460,742,289,555,758,298,379,66,686,320,533,106,144,747,376,65,520,367,290,627,685,763,448,318,678,139,704,215,466,725,285,618,625,532,681,25,487,433,540,137,760,445,170,564,98,729,721,301,83,481,278,247,267,598,624,694,109,656,528,16,404,216,102,586,382,246,644,307,638,682,354,610,421,726,570,167,89,183,294,115,546,439,535,593,703,715,92,222,669,297,291,630,157,239,134,614,105,42,220,61,676,231,316,371,408,573,6,369,781,427,362,705,116,300,389,274,590,282,343,483,195,795,198,687,113,502,491,163,359,671,496,773,697,663,635,381,734,329,387,33,64,743,169,252,275,511,409,21,332,218,368,310,731,472,317,561,465,557,383,420,519,236,241,335,374,129,96,639,13,273,549,451,522,677,79,696,353,114,392,716,698,488,778,417,178,351,206,172,233,582,43,279,141,76,385,199,675,411,626,756,181,296,325,637,426,75,7,245,258,628,326,9,524,654,375,136,58,27,240,103,560,462,71,302,323,612,646,708,605,513,461,414,613,155,390,692,776,87,424,45,210,709,534,182,516,80,161,702,690,32,666,531,442,293,796,595,26,28,793,348,270,121,762,706,164,140,794,127,750,18,91,4,537,341,158,775,260,713,256,153,454,485,281,229,68,88,17,766,360,768,255,544,584,565,85,642,597,261,391,484,497,771,384,152,110,616,356,419,185,101,436,463,168,552,305,508,589,790,450,142,509,36,440,333,51,722,434,203,736,602,517,201,398,366,501,717,266,453,422,265,370,608,652,601,548,482,757,29,443,94,665,67,303,48,751,12,673,545,193,205,707,622,467,396,295,468,202,740,288,413,380,272,176,1,264,782,363,600,403,248,658,97,459,321,357,543,190,213,146,754,358,577,23,748,14,503,108,606,550,523,95,650,500,490,372,93,770,661,196,660,464,786,197,507,553,251,761,315,19,250,63,798,728,621,162,648,52,492,438,542,797,74,430,54,741,714,711,118,746,364,397,607,689,314,559,477,399,745,147,744,117,11,86,41,718,133,125,400,710,749,123,269,82,563,580,47,254,562,388,277,292,599,591,449,268,186,505,386,647,111,437,221,423,458,62,700,529,174,319,691,130,331,789,538,755,470,344,53,604,5,457,211,668,623,60,395,578,659,204,554,587,263,581,35,493,435,131,515,40,194,223,547,238]
import { reactive, toRefs } from 'vue'
import  axios from "axios";
import Menu from "./../../../components/Menu.vue"
import AnnouncementBanner from "./../../../components/AnnouncementBanner.vue"
import Footer from "./../../../components/Footer.vue";
const classLocation = "1cb775fbe97e85d62daa8cbc813e890c64784ae2922c79fb514c4ed3a82373c8_o2"
export default {
    components:{Menu, AnnouncementBanner, Footer},
     async setup () {
        let { data } = await axios.get(`https://staging-backend.relayx.com/api/market/${classLocation}/orders`);
        let orders = data.data.orders;
         orders.sort((a, b) =>{ 
            let a1 =  parseInt(a.satoshis, 10)
            let b1 =  parseInt(b.satoshis, 10)
            return a1- b1
           });
        const state = reactive({
            count: 0, 
            selectedOrderTxid: "",
            error: "",
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
                    location: classLocation,
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
        //  rankNFT(nft){
        //      const i = parseInt(nft.name.split("#")[1].trim(), 10)
        //      let rankSpot = rank.indexOf(i) 
        //      return rankSpot + 1;
        // },
        // rankClass(nft){
        //      let currentRank = this.rankNFT(nft)
        //      if(currentRank <= 8) {return "bg-teal-200 text-teal-800"}
        //     if(currentRank <= 40) {return "bg-yellow-800 text-yellow-200"}
        //     if(currentRank <= 120) {return "bg-red-600 text-red-200"}
        //     if(currentRank <= 240) {return "bg-green-600 text-green-100"}
        //     if(currentRank <= 400) {return "bg-blue-600 text-blue-200"}
        //     return "bg-gray-700 text-gray-100"
        // },
        // rankTextClass(nft){
        //      let currentRank = this.rankNFT(nft)
        //      if(currentRank <= 8) {return "font-extrabold bg-gradient-to-b from-teal-200 via-indigo-400 to-blue-700 bg-clip-text text-transparent"}
        //     if(currentRank <= 40) {return "font-extrabold bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-700 bg-clip-text text-transparent"}
        //     if(currentRank <= 120) {return "font-extrabold bg-gradient-to-b from-red-200 via-red-400 to-red-700 bg-clip-text text-transparent"}
        //     if(currentRank <= 240) {return "font-extrabold bg-gradient-to-b from-green-200 via-green-400 to-green-700 bg-clip-text text-transparent"}
        //     if(currentRank <= 400) {return "font-extrabold bg-gradient-to-b from-blue-200 via-blue-400 to-blue-700 bg-clip-text text-transparent"}
        //     return "font-extrabold bg-gradient-to-b from-gray-200 via-gray-400 to-gray-700 bg-clip-text text-transparent"
        // },
        // rankText(nft){
            
        //      let currentRank = this.rankNFT(nft)
        //      if(currentRank <= 8) {return "Exotic"}
        //     if(currentRank <= 40) {return "Legendary"}
        //     else if(currentRank <= 120) {return "Epic"}
        //     else if(currentRank <= 240) {return "Rare"}
        //     else if(currentRank <= 400) {return "Uncommon"}
        //     return "Common"
        // },
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