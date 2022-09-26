<template>
<div class="text-white"> {{loading}} </div>
<button @click="getWeeklyActions" class='text-white'> Get Actions </button>
    <div v-for="claim in unique" :key="claim.id" class='text-white text-left grid grid-cols-5 space-x-12'>
        <div class='col-span-1'> {{new Date(claim.timestamp.seconds * 1000).toLocaleDateString()}}</div>
        <div class='col-span-1'> {{claim.relay_handle}} </div>
        <div class='col-span-1'>{{claim.ownerAddress}} </div>
        <div class='col-span-1 pl-12'><button @click="getCount(claim)"> Get Count</button>  </div>
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
            if(nftCount.length > 0){                
                let sendAmount = nftCount[0].amount * 300 
                console.log(nftCount[0].amount, sendAmount)
                try{
                    let response = await this.sendPoo(sendAmount, claim.ownerAddress)
                    if(response !== null){
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
            } else { console.log("User Has no NFTs")
                let allUnclaimed = this.unclaimed.filter(ua => ua.relay_handle === claim.relay_handle)
                allUnclaimed.forEach(c => {
                    this.markClaimed(c)
                })
            }
            this.unclaimed = this.findUnclaimed();
            this.loading = false;
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