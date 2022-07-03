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
        <div  class="h-full grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 ">
          <div v-for="(nft, index) in orderedNFTs" :key="index" class="col-span-1 mb-4 mx-1 bg-gray-900 rounded-xl">
               <img :src="getBerryUrl(nft)" class="w-full" />
               <div class='grid grid-cols-4'  :class='rankClass(nft)'>
                    <div class='w-full col-span-2'> <div class='mx-auto'> Edition {{nft.no > 0? nft.no : nft.props.no}}</div>  </div>
                    <div class='col-span-1'> <div class='mx-auto'> Rank # {{rankNFT(nft)}}</div>  </div>
                </div>
                <div class="">
                         <div class='text-4xl pt-2' :class='rankTextClass(nft)'>{{rankText(nft)}} </div>
                    </div>
                <div class="m-4"> 
                    <a noopener norel target="_blank" class="bg-blue-500 rounded-xl text-white p-2 m-2" :href="`https://www.relayx.com/assets/${store.state.selectedFriendCollection.contractId}/${nft.location}`"> VIEW ON RELAY </a>
                </div>
            </div>
        </div>
        <div class='my-96'></div> 
        <Footer />
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import {useRun} from './../../services/wallet.js'
import {mapState, useStore} from 'vuex'
import Menu from "./../../components/MenuComponent2.vue"
import Footer from "./../../components/Footer.vue"

export default {
    components:{Menu, Footer},
    async setup () {
        let store = useStore()
        let {signIn, isLogin,  signOut} = useRun()
        console.log( store.state.selectedFriendCollection.contractId)
        let walletJSON  = await fetch('https://staging-backend.relayx.com/api/user/balance2/' + store.state.user_address)
        let response_data = await walletJSON.json()
        console.log(response_data)
        let collectibles = response_data.data['collectibles'];
        let balances = response_data.data['balances'];
        console.log({balances})
        let selected = collectibles.filter(c => c.origin === store.state.selectedFriendCollection.contractId)

        const state = reactive({
            count: 0,
            inputRank: '',
            loading: false,
            basePricePoo: 5000,
            basePriceBSV: 0.4
        })
        return {
            ...toRefs(state), signOut, signIn, isLogin, store, selected
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
             const i = parseInt(nft.props.no, 10)
             console.log("At Rank: ", this.$store.state.selectedFriendCollection)
             let rankSpot = this.$store.state.selectedFriendCollection.rank.indexOf(i) 
             return rankSpot + 1;
        },
        rankClass(nft){
             let currentRank = this.rankNFT(nft)
             if(currentRank <= this.$store.state.selectedFriendCollection.rank.length * 0.01) {return "bg-teal-200 text-teal-800"}
            if(currentRank <=  this.$store.state.selectedFriendCollection.rank.length * 0.05) {return "bg-yellow-800 text-yellow-200"}
            if(currentRank <=  this.$store.state.selectedFriendCollection.rank.length * 0.15) {return "bg-red-600 text-red-200"}
            if(currentRank <=  this.$store.state.selectedFriendCollection.rank.length * 0.25) {return "bg-green-600 text-green-100"}
            if(currentRank <=  this.$store.state.selectedFriendCollection.rank.length * 0.50) {return "bg-blue-600 text-blue-200"}
            return "bg-gray-700 text-gray-100"
        },
        rankTextClass(nft){
             let currentRank = this.rankNFT(nft)
             if(currentRank <= this.$store.state.selectedFriendCollection.rank.length * 0.01) {return "font-extrabold bg-gradient-to-b from-teal-200 via-indigo-400 to-blue-700 bg-clip-text text-transparent"}
            if(currentRank <= this.$store.state.selectedFriendCollection.rank.length * 0.05) {return "font-extrabold bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-700 bg-clip-text text-transparent"}
            if(currentRank <= this.$store.state.selectedFriendCollection.rank.length * 0.15) {return "font-extrabold bg-gradient-to-b from-red-200 via-red-400 to-red-700 bg-clip-text text-transparent"}
            if(currentRank <= this.$store.state.selectedFriendCollection.rank.length * 0.25) {return "font-extrabold bg-gradient-to-b from-green-200 via-green-400 to-green-700 bg-clip-text text-transparent"}
            if(currentRank <= this.$store.state.selectedFriendCollection.rank.length * 0.50) {return "font-extrabold bg-gradient-to-b from-blue-200 via-blue-400 to-blue-700 bg-clip-text text-transparent"}
            return "font-extrabold bg-gradient-to-b from-gray-200 via-gray-400 to-gray-700 bg-clip-text text-transparent"
        },
        rankText(nft){
            
             let currentRank = this.rankNFT(nft)
             if(currentRank <= this.$store.state.selectedFriendCollection.rank.length * 0.01) {return "Exotic"}
            if(currentRank <= this.$store.state.selectedFriendCollection.rank.length * 0.05) {return "Legendary"}
            else if(currentRank <= this.$store.state.selectedFriendCollection.rank.length * 0.15) {return "Epic"}
            else if(currentRank <= this.$store.state.selectedFriendCollection.rank.length * 0.25) {return "Rare"}
            else if(currentRank <= this.$store.state.selectedFriendCollection.rank.length * 0.50) {return "Uncommon"}
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
        }
    },
    computed:{
        
        orderedNFTs(){
           return [... this.selected].sort((a, b) => this.rankNFT(a) - this.rankNFT(b) > 0 ? 1 : -1);
        },
        ...mapState(["isLogin"])
    }
}
</script>

<style lang="scss" scoped>

</style>