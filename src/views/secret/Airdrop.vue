<template>
    <div class='flex'> 
        <div class="drop-type text-white" v-for="_type in dropTypes" :key="_type">
            <button @click="setDropType(_type)" class='p-2 m-2'> {{_type}} </button>
        </div>
    </div>
<div v-if="dropType === dropTypes[0]" class="grid grid-cols-4 text-white">
    <div class="col-span-1">
        <div class="bg-gray-900 rounded-xl shadow m-2 space-y-1">
            <div>
                <div> Airdrop </div>
                <input v-model="numberOfCoins"  class="text-gray-800 rounded-xl shadow pl-2 w-full"/> 
            </div>
             <div>
                <div>from your stash of </div>
                <input v-model="fromContract" class="text-gray-800 rounded-xl shadow pl-2 w-full" />
            </div>
             <div class='w-full'>
                <div>to each </div>
                <div class="flex space-x-1 w-full">
                    <div class="w-full"> <button class='rounded w-full p-2'  :class="[sendType === 'owners' ? 'bg-green-500' : 'bg-red-500']" @click="setSendType('owners')"> Owner </button> </div>
                    <div class="w-full"> <button class='rounded w-full p-2' :class="[sendType === 'nfts' ? 'bg-green-500' : 'bg-red-500']" @click="setSendType('nfts')"> NFT</button></div>
                </div>
            </div>
            <div>
                 <div> Of Contract </div>
                 <input v-model="toContract"  class="text-gray-800 rounded-xl shadow pl-2 w-full"/> 
            </div>
        </div> 
        <div class="text-white">
            <div class="space-y-2">
                <div> <button class="bg-green-500 rounded-xl p-2 m-2 w-full" @click="loadOptions"> Start!</button></div>
               
            </div>
        </div>
    </div>
    <div class="col-span-3 p-2 m-2 ">
        <div v-if="loading"> Loading ... </div>
         <div> 
            <button class="bg-red-500 rounded-xl p-2 m-2" @click="resetAirdropList"> Reset Airdrop List</button>
        </div>
        <div class="bg-gray-900 rounded-xl">
            <div v-for="owner in owners" :key="owner.address" class="grid grid-cols-4 p-1 bg-gray-200 rounded-xl text-black my-1">
                <div class= "col-span-1"> {{owner.paymail?  owner.paymail : owner.address}}</div> 
                <div class=  "col-span-1"> {{owner.amount}}</div>
                <div class=  "col-span-1"> 
                    <button class="bg-purple-500 rounded-xl p-2" @click="airdrop(owner)"> Airdrop </button>
                </div>
                <div class=  "col-span-1"> {{airdroppedList.indexOf(owner.address) > -1 ? "sent" : ""}}</div>
            </div> 
        </div> 
    </div>
</div>
<div v-else-if="dropType === dropTypes[1]" class='text-white'>
    <div v-if="loading" > Loading ... </div> 
    <div v-for="collectible in collectibles" :key="collectible.location">
        <div class='flex'> 
            <div class='w-full'> Name:{{collectible.props.metadata.name}} </div> 
            <div class='w-full'> Edition:{{collectible.props.metadata.no}} </div> 
            <div class='w-full'> Location: {{collectible.location}} </div> 
            <div class='w-full'> <input v-model="reciever" class="w-full bg-white text-black" /> </div> 
            <div class='w-full'> <button @click="airdropNFT(collectible.location)"> Airdrop </button> </div> 
            
        </div>
    </div>
</div>


</template>

<script>
import { reactive, toRefs } from 'vue'
import {useRun} from '../../services/wallet.js'
import axios from "axios"
const sendTo = ['owners', 'nfts'];
const dropTypes = ['fungible', 'nonFungible'];
export default {
    componenets:{},
    setup () {
         let {setJigs} = useRun()
        setJigs();
        const state = reactive({
            numberOfCoins: 1,
            fromContract: '',
            toContract:'',
            owners: [],
            dropType: "fungible",
            sendType: "",
            loading: false,
            NFTsToSend: [],
            reciever: ""
            
        })
        //let balances = provide("balances", balances )

        return {
            ...toRefs(state), sendTo, dropTypes
        }
    },
    methods:{
        async loadOptions(){
            this.loading = true
            if(this.fromContract ===""){
                this.fromContract = "d0f84d202d91468f9bbdcf6a028e7223abab5a2c935fb347a65bc3ec6d85ddd8_o2";
            }
            if(this.toContract === ""){
                this.toContract = "3ad82590d5d215a5ae04d5c2ed66e7ad711a769ffab42201d77902305a0f3f13_o1";
            }
            if(this.sendType === ""){
                this.sendType = sendTo[0];
            }
            
            let walletJSON  = await fetch('https://staging-backend.relayx.com/api/user/balance2/' + this.$store.state.user_address)
            let response_data = await walletJSON.json()
            console.log(response_data)
            let collectibles = response_data.data['collectibles'];
            let _balances = response_data.data['balances'];
            this.balances = _balances;
            console.log({_balances})
            let selected = collectibles.filter(c => c.origin === this.toContract)
            let pooCount = _balances[this.fromContract]
            console.log(selected, pooCount)
            let { data } = await axios.get(`https://staging-backend.relayx.com/api/token/${this.toContract}/owners`);
            console.log(data.data.owners)
            this.owners = data.data.owners
            this.loading = false;
        },
        async airdrop(owner){
            let coins = 0; 
            console.log(owner.amount)
            if(this.sendType === ""){alert("Set a Send Type"); return;}
            if(this.sendType === this.sendTo[0]){ coins = this.numberOfCoins}
            else if(this.sendType === this.sendTo[1]){
                console.log(this.numberOfCoins, owner.amount)
                coins = Number(this.numberOfCoins) * Number(owner.amount)
            }
            console.log("Sending Number of coins: ", coins);
            try{
                let response = await axios.post('https://staging-backend.relayx.com/api/run/send', {
                    "amount": coins,
                    "location": this.fromContract,
                    "owner": this.$store.state.user_address,
                    "to": owner.address,
                })
                console.log("Gets a raw transaction:", response.data)
                let sendResponse = await window.relayone.send(response.data.data.rawtx)
                console.log("recieves response from send:",  sendResponse)
                this.$store.commit("addToLastAirdroppedList", owner.address)
            }catch(err){
                console.log(err);
                alert(err);
            }
             
        },
        async fetchMyNFTs(){
            let walletJSON  = await fetch('https://staging-backend.relayx.com/api/user/balance2/' + this.$store.state.user_address)
            let response_data = await walletJSON.json()
            console.log(response_data)
            let collectibles = response_data.data['collectibles'];
            let balances = response_data.data['balances'];
            console.log({balances})
            this.$store.commit("setBalances", balances);
            this.$store.commit("setCollectibles", collectibles);
            this.NFTsToSend = collectibles.filter(c => c.origin === '3ad82590d5d215a5ae04d5c2ed66e7ad711a769ffab42201d77902305a0f3f13_o1')
        },
        resetAirdropList(){
            this.$store.commit("clearLastAirdroppedList");
        },
        setSendType(_type){
            this.sendType = _type;
        },
        async setDropType(_type) {
            this.loading = true
            this.dropType = _type;
            if(this.dropType === "nonFungible"){
              await this.fetchMyNFTs();
              console.log(this.$store.state.balances)  
              console.log(this.$store.state.collectibles)
            }
            this.loading = false;
        },
        async airdropNFT(location){
            try{
            console.log(this.reciever)
            const r = await fetch('https://api.relayx.io/v1/paymail/run/' + this.reciever)
            const res = await r.json()
             console.log('res', res.data)
            let _userAddress = res.data
             let response = await axios.post('https://staging-backend.relayx.com/api/run/send_nft', {
                    "location": location,
                    "asset_location": location,
                    "owner": this.$store.state.user_address,
                    "to": _userAddress
                })
            console.log("Gets a raw transaction:", response.data)
            let sendResponse = await window.relayone.send(response.data.data.rawtx)
            console.log("recieves response from send:",  sendResponse)
            console.log("txid for send",  sendResponse.txid)
            }
            catch(err){alert(err)}
        },
    },
    computed:{
        airdroppedList(){
            return this.$store.state.lastAirdroppedList; 
        },
        collectibles(){
            return this.$store.state.collectibles
        },
        balances(){
            return this.$store.state.balances
        }
    }
}
</script>

<style lang="scss" scoped>

</style>