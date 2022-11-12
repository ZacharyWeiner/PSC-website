<template>
    <div v-if="isLogin">
        <div v-if='canClaim' > 
            <!-- <div class='text-center'> Claim </div> -->
            <div class='text-center pb-4'> 
                <div class="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                    <button @click="saveUserAction" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"> CLAIM {{esitmatedPoo}} NOW!</button>
                    
                </div>
               
            </div>
            <div class="text-md"> <b>This Weeks Bonus: </b> </div>
             <div class="text-xl"><span class="text-green-700">{{propertyName.toUpperCase()}} - {{propertyValue.toUpperCase()}}</span> </div>
             <div class="pt-4"> 
                <div class="text-xl">  Claiming This Week:</div>    
             </div>
            <div class="w-full bg-gray-900 rounded-xl m-2 px-2" v-for="jig in eligibleNFTs" :key="jig.location"> 
                <div class="flex space-x-6 w-full"> 
                    <div class="w-16 h-16 flex items-center">  <img class="rounded-full w-full" :src="getBerryUrl(jig)" /></div> 
                    <div class="my-auto w-full text-left"> 
                        <div class="flex w-full">
                            <div class="text-gray-100 font-bold px-4">{{jig.name}}</div>
                            <div class="text-yellow-400 w-full my-auto">
                                <div> Will Claim </div>
                                <div v-if="hasBonus(jig)" class="text-green-400">  BONUS!</div> 
                            </div> 
                            <div class="text-right font-bold text-green-400 my-auto">  {{this.calculatePOOPayment(jig)}} </div>
                        </div> 
                    </div>
                </div>    
            </div>
            <div class="pt-4"> 
                Last Claimed: {{lastAction}}
            </div>  
            <div class="text-left space-y-4 pt-4">
                <p> From time to time every Pewnicorns in a wallet is eligible to $POO. Any Studs you have for sale, will not be able to claim, because they are not in your stable, they are at the exchange. </p>
                <p> Final numbers are calculated at the moment claims are paid out. This is to prevent people from claiming POO in more than one wallet for the same Stud in any given week</p>
            </div>      
        </div>
        <div v-else-if="userJigs.length > 0" >
            <div class="">  {{successMessage}}</div>   
            <img src="https://slavettes-layers.s3.amazonaws.com/pewnicorns/pewnicorn-claim-gif.gif" />
            <div class="text-md"> <b>This Weeks Bonus: </b> </div>
             <div class="text-xl"><span class="text-green-700">{{propertyName.toUpperCase()}} - {{propertyValue.toUpperCase()}}</span> </div>
             <div class="pt-4"> 
                 
                <div class="text-xl">  Claiming This Week:</div>    
                
             </div>
             <div class="w-full bg-gray-900 rounded-xl m-2 px-2" v-for="jig in eligibleNFTs" :key="jig.location"> 
                <div class="flex space-x-6 w-full"> 
                    <div class="w-16 h-16 flex items-center">  <img class="rounded-full w-full" :src="getBerryUrl(jig)" /></div> 
                    <div class="my-auto w-full text-left"> 
                        <div class="flex w-full">
                            <div class="text-gray-100 font-bold px-4">{{jig.name}}</div>
                            <div class="text-yellow-400 w-full my-auto">
                                <div> Will Claim </div>
                                <div v-if="hasBonus(jig)" class="text-green-400">  BONUS!</div> 
                            </div> 
                            <div class="text-right font-bold text-green-400 my-auto">  {{this.calculatePOOPayment(jig)}} </div>
                        </div> 
                    </div>
                </div>    
            </div>  
        </div>
        <div v-else>You must own a Pewnicorn PRD NFT to Claim </div>
    </div>
    <div v-else>You must be logged in to Claim </div>
</template>

<script>
import { reactive, toRefs, ref } from 'vue'
import {useStore} from "vuex"
import { userProfiles} from "./../services/firebase.js"
import { useRun } from "./../services/wallet.js"
import axios from "axios"
import {useNFTRankings} from "./../data/nftRankings.js"
export default {
    setup () {
        let {setUserAction, findUserActions} = userProfiles()
        let {isLogin} = useRun()
        let store = useStore();
        let eligibleNFTs = ref([])
        const state = reactive({
            count: 0,
            baseAward: 100,
            multiplier: 5,
            propertyName: 'clothes',
            propertyValue: 'jean jacket sv pocket',
            successMessage: "Your $POO has been claimed and will be sent SOON",
            esitmatedPoo: 0,
        })
        console.log(store.state.relayx_handle);
        let userActions = findUserActions(store.state.relayx_handle);
        return {
            ...toRefs(state), setUserAction, findUserActions, isLogin, userActions, eligibleNFTs
        }
    },
    async mounted(){
       await this.getEligible(this.$store.state.user_address);
    },
    methods:{
        saveUserAction(){
            if(this.isLogin){
                if(!this.$store.state.userHasAction){
                let actions = this.findUserActions(this.$store.state.relayx_handle)
                if(actions > 0){
                    this.$store.commit("setHasAction", true);
                }else{
                    this.$store.commit("setHasAction", true);
                    console.log(this.$store.state.relayx_handle)
                    this.setUserAction(this.$store.state.relayx_handle, this.$store.state.user_address, "Claim")
                }
                }
            }
            console.log(this.$store.state.relayx_handle, this.$store.state.user_address, "Claim")
            this.getUserActions();
            this.userActions = this.findUserActions(this.$store.state.relayx_handle);
        },
        getUserActions(){
            return this.userActions
        },
        calculatePOOPayment(nft){
            let sendAmount = this.baseAward; 
            let bonus = this.bonusForRank(nft)
            if(nft.props.metadata[this.propertyName] === this.propertyValue){
                sendAmount = this.baseAward * this.multiplier;
            }
            sendAmount = sendAmount + bonus;
            console.log("Send Amount For ", nft, " Is ", sendAmount)
            return sendAmount
        },
        rankNFT(nft){
            let { pewnicornRanks } = useNFTRankings();
             const i = parseInt(nft.props.metadata.no, 10)
             let rankSpot = pewnicornRanks.indexOf(i) 
             return rankSpot + 1;
        },
        bonusForRank(nft){
            let currentRank = this.rankNFT(nft)
            if(currentRank <= 8) {return 500}
            if(currentRank <= 40) {return 400}
            if(currentRank <= 120) {return 300}
            if(currentRank <= 240) {return 200}
            if(currentRank <= 400) {return 100}
            return 0
        },
        getBerryUrl(nft){
            let suffix = nft.berry.txid
            if(suffix){
                return 'https://berry.relayx.com/'+ suffix
            }
            return ''
            
        },
        async getEligible(address){
            let walletJSON  = await fetch('https://staging-backend.relayx.com/api/user/balance2/' + address)
            let response_data = await walletJSON.json()
            console.log(response_data)
            let collectibles = response_data.data['collectibles'];
            let balances = response_data.data['balances'];
            console.log({balances})
            let selected = collectibles.filter(c => c.origin === '3ad82590d5d215a5ae04d5c2ed66e7ad711a769ffab42201d77902305a0f3f13_o1')
            //let totalPayment = 0; 
            let { data } = await axios.get("https://staging-backend.relayx.com/api/market/3ad82590d5d215a5ae04d5c2ed66e7ad711a769ffab42201d77902305a0f3f13_o1/orders");
            let orders = data.data.orders;
            let eligable = [];
            for(let x =0; x < selected.length; x++ ){
                let hasOrder = orders.filter(o => o.name === selected[x].location)
                if(hasOrder.length === 0){
                    eligable.push(selected[x])
                }
            }
            this.eligibleNFTs = eligable
            this.esitmatedPoo =  await this.calculateSendAmount();
        },
        async calculateSendAmount(){
            let totalPayment = 0;
            for(let x =0; x < this.eligibleNFTs.length; x++ ){
                let addToPayment = 0; 
                addToPayment = this.calculatePOOPayment(this.eligibleNFTs[x]);
                totalPayment = totalPayment + addToPayment;
            }
            console.log("Total Payment: ", totalPayment)
            return totalPayment;
        },
        hasBonus(nft){
            if(nft.props.metadata[this.propertyName] === this.propertyValue){
                return true
            }
            return false;
        }
    },
    computed:{
        userHasAction(){
            console.log(this.userActions['userActions'].value.length)
            if(this.userActions['userActions'].value.length >  1){
                return true;
            }
            return false;
        },
        canClaim() {
            let _canClaim = false;
            if(this.isLogin  && this.$store.state.user_jigs.length > 0){
                _canClaim = true;
            } 
            let compareDate = new Date('2022-11-12');
            this.userActions['userActions'].value.forEach((ua)=> {
                let actionDate = new Date(ua.timestamp.seconds * 1000);
                if( actionDate > compareDate){
                    console.log("newer")
                    _canClaim = false;
                }
            })
            console.log(compareDate, this.isLogin,  this.userActions['userActions'].value.length >  0,  this.$store.state.user_jigs.length > 0)
            
            return _canClaim;
        },
        lastAction(){
            let last = null;
            this.userActions['userActions'].value.forEach((ua)=> {
                let _compare = new Date(ua.timestamp.seconds * 1000); 
                if( last === null || _compare > last){
                    last  = _compare;
                }
            })
            return last === null ? "None" : last.toDateString();
        },
         userJigs(){
            return this.$store.state.user_jigs;
        },
    }
}
</script>

<style lang="scss" scoped>

</style>