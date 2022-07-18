<template>
    <div class='text-white min-h-screen'>
        <Menu />
        <div
        class="h-36 bg-contain bg-center md:h-64"
        style="
            background-image: url('https://slavettes-layers.s3.amazonaws.com/pewnicorns/pewnicorns+header.png');
        "
        ></div>
        <div v-if="!isLogin" class='justify-end'>
            <div class="">
                <div class="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
                <h2 class="text-3xl font-extrabold tracking-tight pl-3 text-2xl lg:text-4xl font-extrabold bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-700 bg-clip-text text-transparent sm:text-4xl">
                    <span class="block">You Must Be Logged In</span>
                    <span class="block">To See Your Bag</span>
                </h2>
                </div>
            </div>
        </div>
        <div v-if="orderedNFTs.length === 0"> 
            <div class="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
                <span class='text-3xl'> 👀</span>
                <h2 class="text-3xl font-extrabold tracking-tight pl-3 text-2xl lg:text-4xl font-extrabold bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-700 bg-clip-text text-transparent sm:text-4xl">
                    <span class="block">This Bag Looks Empty AF</span>
                    <span class="block">You NGMI</span>
                </h2>
            </div>
        </div>
        <div  class="h-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 ">
            
            <div v-for="nft in orderedNFTs" :key="nft.location"  class='col-span-1 pt-4'>
                <div class="mx-2  rounded-b-xl bg-gray-900"> 
                    <div class='grid grid-cols-2'  :class='rankClass(nft)'>
                        <div class='w-full col-span-1'> <div class='mx-auto'> Edition {{nft.props.metadata.no}}</div>  </div>
                        <div class='w-full col-span-1'> <div class='mx-auto'> Rank # {{rankNFT(nft)}}</div>  </div>
                        <div class='w-full col-span-1'> <div class='mx-auto'> Trade in for</div>  </div>
                        <div class='w-full col-span-1'> <div class='mx-auto'> {{setPricePoo(nft) * 0.9}} $POO</div>  </div>
                    </div>
                    <div > <img class='w-full' :src="getBerryUrl(nft)" /></div>
                    <div class='pt-2 rounded-xl mx-4 '>
                        <div class='text-4xl pt-2' :class='rankTextClass(nft)'>{{rankText(nft)}} </div>
                        <div class='border-b-1'></div>
                        <div class="grid grid-cols-1 h-48 overflow-y-scroll"> 
                            <div class='col-span-1'> 
                                <div class="grid grid-cols-2"> 
                                    <div class='col-span-1'> Wings: </div>
                                    <div class='col-span-1 text-left'> {{nft.props.metadata.wings}}</div>
                                </div>
                            </div>
                            <div class='col-span-1'> 
                                <div class="grid grid-cols-2"> 
                                    <div class='col-span-1 '> Head: </div>
                                    <div class='col-span-1 text-left'> {{nft.props.metadata.head}}</div>
                                </div>
                            </div>
                            <div class='col-span-1'> 
                                <div class="grid grid-cols-2"> 
                                    <div class='col-span-1'> Eyes: </div>
                                    <div class='col-span-1 text-left'> {{nft.props.metadata.eyes}}</div>
                                </div>
                            </div>
                            <div class='col-span-1'> 
                                <div class="grid grid-cols-2"> 
                                    <div class='col-span-1'> Clothes: </div>
                                    <div class='col-span-1 text-left'> {{nft.props.metadata.clothes}}</div>
                                </div>
                            </div>
                            <div class='col-span-1'> 
                                <div class="grid grid-cols-2"> 
                                    <div class='col-span-1'> Hair: </div>
                                    <div class='col-span-1 text-left'> {{nft.props.metadata.hair}}</div>
                                </div>
                            </div>
                            <div class='col-span-1'> 
                                <div class="grid grid-cols-2"> 
                                    <div class='col-span-1'> Horn: </div>
                                    <div class='col-span-1 text-left'> {{nft.props.metadata.horn}}</div>
                                </div>
                            </div>
                        </div>
                        <div class="grid grid-cols-2"> 
                           
                        </div>
                </div> 
                 <button @click="redeem(nft)" class="w-full text-white bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-bold rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"> 
                            {{getButtonText(nft)}}
                        </button>
            </div>
        </div>
        </div>
        <div class='my-96'></div> 
        <Footer />
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import {useRun} from './../services/wallet.js'
import {mapState, useStore} from 'vuex'
import Menu from "./../components/MenuComponent2.vue"
import Footer from "./../components/Footer.vue"
import axios from "axios";
import {useRedemptions} from "./../services/firebase.js"
const rank = [46,227,138,611,670,633,688,253,727,475,521,20,620,2,567,226,478,785,739,777,455,78,126,173,112,328,572,674,473,510,752,407,471,230,148,568,249,287,122,180,579,512,8,373,719,73,149,574,596,619,124,603,334,699,641,683,145,50,657,59,506,518,104,347,225,765,405,192,31,283,340,592,77,81,15,44,242,361,262,311,514,585,352,394,243,418,788,308,154,498,530,55,720,34,402,649,312,446,336,780,280,150,737,738,800,128,37,415,151,257,791,69,337,653,479,701,799,759,733,24,299,447,56,393,631,504,525,259,680,769,187,428,188,338,452,526,100,664,772,175,672,286,551,566,377,684,135,224,38,693,324,583,171,120,536,160,406,355,39,107,784,10,571,569,655,401,232,410,244,327,576,346,753,119,49,588,774,662,645,456,200,632,730,235,234,276,783,558,70,767,764,184,723,156,214,712,640,792,480,679,339,441,527,284,165,228,575,212,306,350,72,342,365,349,634,495,489,416,499,84,429,539,271,159,209,304,30,207,166,132,99,217,22,3,219,345,177,629,179,431,617,189,667,615,90,494,636,143,735,444,469,322,330,191,695,724,787,313,476,556,378,474,651,779,208,643,309,237,594,432,541,609,412,57,486,732,425,460,742,289,555,758,298,379,66,686,320,533,106,144,747,376,65,520,367,290,627,685,763,448,318,678,139,704,215,466,725,285,618,625,532,681,25,487,433,540,137,760,445,170,564,98,729,721,301,83,481,278,247,267,598,624,694,109,656,528,16,404,216,102,586,382,246,644,307,638,682,354,610,421,726,570,167,89,183,294,115,546,439,535,593,703,715,92,222,669,297,291,630,157,239,134,614,105,42,220,61,676,231,316,371,408,573,6,369,781,427,362,705,116,300,389,274,590,282,343,483,195,795,198,687,113,502,491,163,359,671,496,773,697,663,635,381,734,329,387,33,64,743,169,252,275,511,409,21,332,218,368,310,731,472,317,561,465,557,383,420,519,236,241,335,374,129,96,639,13,273,549,451,522,677,79,696,353,114,392,716,698,488,778,417,178,351,206,172,233,582,43,279,141,76,385,199,675,411,626,756,181,296,325,637,426,75,7,245,258,628,326,9,524,654,375,136,58,27,240,103,560,462,71,302,323,612,646,708,605,513,461,414,613,155,390,692,776,87,424,45,210,709,534,182,516,80,161,702,690,32,666,531,442,293,796,595,26,28,793,348,270,121,762,706,164,140,794,127,750,18,91,4,537,341,158,775,260,713,256,153,454,485,281,229,68,88,17,766,360,768,255,544,584,565,85,642,597,261,391,484,497,771,384,152,110,616,356,419,185,101,436,463,168,552,305,508,589,790,450,142,509,36,440,333,51,722,434,203,736,602,517,201,398,366,501,717,266,453,422,265,370,608,652,601,548,482,757,29,443,94,665,67,303,48,751,12,673,545,193,205,707,622,467,396,295,468,202,740,288,413,380,272,176,1,264,782,363,600,403,248,658,97,459,321,357,543,190,213,146,754,358,577,23,748,14,503,108,606,550,523,95,650,500,490,372,93,770,661,196,660,464,786,197,507,553,251,761,315,19,250,63,798,728,621,162,648,52,492,438,542,797,74,430,54,741,714,711,118,746,364,397,607,689,314,559,477,399,745,147,744,117,11,86,41,718,133,125,400,710,749,123,269,82,563,580,47,254,562,388,277,292,599,591,449,268,186,505,386,647,111,437,221,423,458,62,700,529,174,319,691,130,331,789,538,755,470,344,53,604,5,457,211,668,623,60,395,578,659,204,554,587,263,581,35,493,435,131,515,40,194,223,547,238]
export default {
    components:{Menu, Footer},
    async setup () {
        let store = useStore()
        let {signIn, isLogin,  signOut, setJigs} = useRun()
        setJigs();
        console.log(store.state.user_jigs)
        const state = reactive({
            count: 0,
            inputRank: '',
            loading: false,
            basePricePoo: 5000,
            basePriceBSV: 0.4,
            selectedEdition: 0,
        })
        return {
            ...toRefs(state), signOut, signIn, isLogin, setJigs, store, rank
        }
    },
    methods:{
        async login(){
            this.loading = true
            await this.signIn();
            this.loading = false
        },
        logout(){
            this.signOut(this.$store);
        },
        getBerryUrl(nft){
            let suffix = nft.berry.txid
            if(suffix){
                return 'https://berry.relayx.com/'+ suffix
            }
            return ''
            
        },
        formatRank(){
            let split = this.inputRank.split('\n')
            console.log(split)
            //this.rankText = split;
        },
        rankNFT(nft){
             const i = parseInt(nft.props.metadata.no, 10)
             let rankSpot = rank.indexOf(i) 
             return rankSpot + 1;
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
        setPricePoo(nft){
             let currentRank = this.rankNFT(nft)
             let multiplier  = 1;
            if(currentRank <= 8) {multiplier = multiplier + 100}
            if(currentRank <= 40) {multiplier = multiplier + 22}
            else if(currentRank <= 120) {multiplier = multiplier + 10}
            else if(currentRank <= 240) {multiplier = multiplier + 6.6}
            else if(currentRank <= 400) {multiplier = multiplier + 3.3}
             let cm = this.extraMultiplier(nft)
            return this.basePricePoo * (multiplier + cm)
        },
        setPriceBSV(nft){
            let multiplier  = 1;
             let currentRank = this.rankNFT(nft)
            if(currentRank <= 8) {multiplier = multiplier +100}
            if(currentRank <= 40) {multiplier = multiplier + 50}
            else if(currentRank <= 120) {multiplier = multiplier + 10}
            else if(currentRank <= 240) {multiplier = multiplier + 6.5}
            else if(currentRank <= 400) {multiplier = multiplier + 3.2}
            let cm = this.extraMultiplier(nft)
            return (this.basePriceBSV * (multiplier + cm)).toFixed(3)
        },
        extraMultiplier(nft){
            let multiplier = 0;
            let metadata = nft.props.metadata;
            let ppItems = metadata.clothes.split("pp")?.length
            console.log("PP Items:", ppItems)
            let svItems = metadata.clothes.split("sv")?.length
            console.log("SV Items:", svItems)
            if((ppItems && ppItems >= 3) && (svItems && svItems >= 3)){multiplier = 1}
            else if((ppItems && ppItems >= 2) && (svItems && svItems >= 2)){multiplier = 0.75}
            else if(ppItems && (ppItems >= 2)){multiplier =  0.25}
            else if(svItems && (svItems >= 2)){multiplier = 0.25}

            let duroEyes = metadata.eyes.split("duro")?.length
            let duroChain = metadata.accessories_neck.split("duro")?.length

            if(duroEyes > 1 || duroChain > 1){
                if(duroEyes > 1){multiplier = multiplier + 0.5}
                if(duroChain > 1){multiplier = multiplier + 0.5}
            } 
            let pewcciGlasses = metadata.eyes.split("pewcci")?.length
            if(pewcciGlasses > 1){multiplier = multiplier + 0.5}
            return multiplier;
        },
        async redeem(nft){
            this.selectedEdition = nft.location
            this.loading = true
            let price = this.setPricePoo(nft) * 0.9
            let amount = parseInt(price, 10);
            console.log("price before redeem", amount, nft); 
            try{
                let sendResponse = await this.sendNFT(nft.location)
                console.log("Send NFT Response:", sendResponse)
                let {sendRedemption} = useRedemptions()
                let redemptionResponse = sendRedemption(sendResponse.txid, this.$store.state.relayx_handle, this.$store.state.user_address, nft.props.metadata.no,  amount)
                console.log("Redemption Added Response (should be undef):", redemptionResponse)
                await this.setJigs();

            }catch(err){alert(err); console.log(err)}
            this.loading = false

        },
        async sendNFT(location){
            let response = await axios.post('https://staging-backend.relayx.com/api/run/send_nft', {
                    "location": location,
                    "asset_location": location,
                    "owner": this.$store.state.user_address,
                    "to": "13gqSLMuaW19vCWWgRXC8iMUdmcneYiUh9",
                })
            console.log("Gets a raw transaction:", response.data)
            let sendResponse = await window.relayone.send(response.data.data.rawtx)
            console.log("recieves response from send:",  sendResponse)
            return sendResponse
        },
        getButtonText(nft){
            if(this.loading && this.selectedEdition === nft.location){
                return "working ..." 
            }
            return `Exchange for ${parseInt(this.setPricePoo(nft) * 0.90, 10)} $POO`
        }
    },
    computed:{
        
        orderedNFTs(){
           return [... this.$store.state.user_jigs].sort((a, b) => a.props.metadata.no - b.props.metadata.no > 0 ? a : b);
        },
        ...mapState(["isLogin"])
    }
}
</script>

<style lang="scss" scoped>

</style>