<template>
    <div class="text-white">
        <button class='text-white' @click="getNoOrders">Get No Orders</button>
        {{noOrders?.length}}
        <div v-if="noOrders?.length > 0" class='text-white p-2 m-2'>
            <div v-for="owner in noOrders" :key="owner.address" class="flex space-x-1">
                <div class='w-full'> {{owner.paymail ? owner.paymail : owner.address}} </div> <div class='w-full text-left'>{{owner.amount}}</div>
            </div>
        </div>
    </div>
    <div> 
        Claims
        <button class='text-white' @click="findAllClaims">Find Claims</button>
        <div class="text-white" v-for="handle in uniqe" :key="handle">
            "{{handle}}"
        </div>
    </div>
</template>

<script>
import { reactive, ref, toRefs } from 'vue'
import { userProfiles } from '../services/firebase.js'
import axios from "axios"
export default {
    async setup () {
        let noOrders = ref([]);
        let owners = ref([])
        console.log(noOrders.value)
        let { allActions} = userProfiles();
        console.log(allActions)
        const state = reactive({
            count: 0,
        })
    
        return {
            ...toRefs(state),
            noOrders,
            owners,
            allActions
        }
    },
    methods: {
        async getNoOrders(){
            let { data } = await axios.get("https://staging-backend.relayx.com/api/market/3ad82590d5d215a5ae04d5c2ed66e7ad711a769ffab42201d77902305a0f3f13_o1/orders");
            let orders = data.data.orders;
            let ownersResponse = await axios.get("https://staging-backend.relayx.com/api/token/3ad82590d5d215a5ae04d5c2ed66e7ad711a769ffab42201d77902305a0f3f13_o1/owners");
            this.owners = ownersResponse.data.data.owners

            this.owners.forEach((o) => {
                let ordersForOwner = orders.filter((oo) => oo.seller === o.address);
                if(ordersForOwner.length > 0){
                    console.log(o.paymail, o.amount, o.address, "has an order on the market")
                }else{
                    console.log(o);
                    this.noOrders.push(o);
                }
            })

            this.noOrders.sort((a,b) => a.amount > b.amount ? -1 : 1)
        },
    },
    computed:{
        uniqe(){
            let uniqHandles = [];
            this.allActions.forEach((c) =>{
                if(uniqHandles.indexOf(c.relay_handle) === -1 ){ 
                    console.log(c); 
                    uniqHandles.push(c.relay_handle)
                }
            })
            return uniqHandles
        }
    }
}
</script>

<style lang="scss" scoped>

</style>