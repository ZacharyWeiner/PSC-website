<template>
<div class="text-white"> {{loading}} </div>
<button @click="getWeeklyActions" class='text-white'> Get Actions </button>
    <div v-for="claim in unique" :key="claim.id" class='text-white text-left grid grid-cols-5 space-x-12'>
        <div class='col-span-1'> {{new Date(claim.timestamp.seconds * 1000).toLocaleDateString()}}</div>
        <div class='col-span-1'> {{claim.relay_handle}} </div>
        <div class='col-span-1'>{{claim.ownerAddress}} </div>
        <div class='col-span-1 pl-12'><button @click="getCount(claim)"> Get Count</button>  </div>
        <div class='col-span-1 pl-12'><button @click="calculateSendAmount(claim.ownerAddress)"> Get Order Count</button>  </div>
    </div>
</template>

<script>
import { reactive, toRefs, ref } from 'vue'
import { userProfiles } from './../../services/firebase.js'
import axios from "axios"
export default {
    setup () {
        const loading = ref(false);
        const weeklyActions = ref([])
         let {findUnclaimed} = userProfiles();
        let unclaimed = findUnclaimed()
        let { markClaimed } = userProfiles()
        const state = reactive({
            count: 0,
            baseAward: 100,
            multiplier: 5,
            propertyName: 'hair',
            propertyValue: 'mowhawk green',
        })
    
        return {
            ...toRefs(state), weeklyActions, loading, findUnclaimed, markClaimed, unclaimed
        }
    },
    methods:{
        getWeeklyActions(){
            this.weeklyActions = []
            this.loading = true
            let s = this.unclaimed;
            console.log(this.unclaimed)
            if(s.length > 0){
                var sevenDaysAgo = new Date();
                sevenDaysAgo.setDate(sevenDaysAgo.getDate() -21);
                console.log(sevenDaysAgo)
                
                s.sort((a,b) => a.seconds - b.seconds > 0 ? -1 : 1)
                s.forEach(d => {
                    let compareDate = new Date(d.timestamp.seconds * 1000);
                    if(compareDate >= sevenDaysAgo){
                        this.weeklyActions.push(d)
                    }
                })
            }else{
                console.log(this.unclaimed)
            }
            
            this.loading = false;
        },
        async getCount(claim){
            this.loading = true;
            let { data } = await axios.get("https://staging-backend.relayx.com/api/token/3ad82590d5d215a5ae04d5c2ed66e7ad711a769ffab42201d77902305a0f3f13_o1/owners");
            // console.log(data.data, claim.id)
            let nftCount = data.data.owners.filter(o => o.address === claim.ownerAddress)
            console.log(nftCount);
            if(nftCount.length > 0){       
                let orderCount = await this.getOrderCount(claim.ownerAddress)  
                console.log("OrderCount before send:", orderCount);       
                let sendAmount = await this.calculateSendAmount(claim.ownerAddress)
                console.log(nftCount[0].amount, sendAmount)
                try{
                    let response = await this.sendPoo(sendAmount, claim.ownerAddress)
                    if(response){
                        console.log("No error on send poo", response)
                        let allUnclaimed = this.unclaimed.filter(ua => ua.relay_handle === claim.relay_handle)
                        console.log("All Uncliamed", allUnclaimed)
                        allUnclaimed.forEach(c => {
                            this.markClaimed(c)
                            console.log("Marked Cliamed", c);
                        })
                    } else {
                        alert("The response was null indicating an error occurred");
                    }
                }catch(err){
                    console.log("There was an error sending POO", nftCount, err)
                }
            } 
            else { console.log("User Has no NFTs")
                let allUnclaimed = this.unclaimed.filter(ua => ua.relay_handle === claim.relay_handle)
                allUnclaimed.forEach(c => {
                    this.markClaimed(c)
                })
            }
            this.unclaimed = this.findUnclaimed();
            this.loading = false;
        },
        async getOrderCount(address){
            let orderCount = 0;
            let { data } = await axios.get("https://staging-backend.relayx.com/api/market/3ad82590d5d215a5ae04d5c2ed66e7ad711a769ffab42201d77902305a0f3f13_o1/orders");
            console.log(data.data)
            if(data.data.orders.length > 0){
                orderCount = data.data.orders.filter(o => o.seller === address)
            }
            console.log(orderCount);
            return orderCount;
        },
        async calculateSendAmount(address){
            console.log("Calculating Send amount for ", address)
            let walletJSON  = await fetch('https://staging-backend.relayx.com/api/user/balance2/' + address)
            let response_data = await walletJSON.json()
            console.log(response_data)
            let collectibles = response_data.data['collectibles'];
            let balances = response_data.data['balances'];
            console.log({balances})
            let selected = collectibles.filter(c => c.origin === '3ad82590d5d215a5ae04d5c2ed66e7ad711a769ffab42201d77902305a0f3f13_o1')
            let totalPayment = 0; 
            let { data } = await axios.get("https://staging-backend.relayx.com/api/market/3ad82590d5d215a5ae04d5c2ed66e7ad711a769ffab42201d77902305a0f3f13_o1/orders");
            let orders = data.data.orders;
            console.log(orders)
            for(let x =0; x < selected.length; x++ ){
                let hasOrder = orders.filter(o => o.name === selected[x].location)
                if(hasOrder){
                    console.log("Has Order for ", selected[x].location, " ", hasOrder)
                }
                let addToPayment = 0; 
                addToPayment = this.calculatePOOPayment(selected[x]);
                totalPayment = totalPayment + addToPayment;
            }
            console.log("Total Payment: ", totalPayment)
            return totalPayment;
        },
        calculatePOOPayment(nft){
            let sendAmount = this.baseAward; 
            if(nft.props.metadata[this.propertyName] === this.propertyValue){
                sendAmount = this.baseAward * this.multiplier;
            }
            console.log("Send Amount For ", nft, " Is ", sendAmount)
            return sendAmount
        },
        async sendPoo(amount, address){
            try{
                let response = await axios.post('https://staging-backend.relayx.com/api/run/send', {
                    "amount": amount,
                    "location": "d0f84d202d91468f9bbdcf6a028e7223abab5a2c935fb347a65bc3ec6d85ddd8_o2",
                    "owner": this.$store.state.user_address,
                    "to": address,
                })
                console.log("Gets a raw transaction:", response.data)
                let sendResponse = await window.relayone.send(response.data.data.rawtx)
                console.log("recieves response from send:",  sendResponse)
                return sendResponse;
            }catch(err){alert(err); return ;}
        },
    },
    computed:{
        unique(){
            let uniqAccounts = [];
            this.weeklyActions.forEach((c) =>{
                let counter = uniqAccounts.filter(a => a.relay_handle === c.relay_handle)
                if(counter.length === 0){uniqAccounts.push(c)}
                console.log(counter, c.relay_handle)
            })
            return uniqAccounts
        },
    }
}
</script>

<style lang="scss" scoped>

</style>