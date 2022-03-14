<template>
     <div
      class="h-36 bg-contain bg-center md:h-64"
      style="
        background-image: url('https://slavettes-layers.s3.amazonaws.com/pewnicorns/pewnicorns+header.png');
      "
    > 
    </div>
    <button @click='syncRun' class='text-white px-4'> Sync Run </button>
    <button @click='sendNFTs' class='text-white px-4'> Send </button>
    <div v-for='order in ordered' :key="order.id" class='text-white text-left py-1 ring-1'>
        <div class="flex">
            <div class='w-full'> {{new Date(order.createdAt.seconds * 1000).toString()}}</div>
            <div class='items-right'> <button @click='deleteRecord(order)'> Delete </button> </div>
        </div>
        <div> {{order.relayHandle}}, {{order.txid}}, {{order.runAddress}} </div>
    </div> 
</template>

<script>
import { ref, 
//reactive, toRefs 
} from 'vue'
//import Run from "run-sdk"
import {useOrders} from '../services/firebase.js'
import {config} from './../config.js'
//let NFTClass = "7d8fccf051949f29ace598e9b6d72d136830006bba936d5a8aaa7312242d70cf_o1"

export default {
     setup () {
      let decimals = ref(0)
      let purseBalance = ref(0)
      let searching = ref(false);
      let nfts = ref([])
      let handle = ref('');
      let userRunAddress = ref('')
      const {allOrders, findOrders, deleteOrder} = useOrders()
      console.log(config.mintPayPrivKey, config.mintOwnerPrivKey)
     
    
        return {
            decimals, purseBalance, searching, nfts, handle, userRunAddress, allOrders, findOrders, deleteOrder
        }
    },
    methods:{
        async syncRun(){
            //  let run = new Run({
            //     trust: "*",
            //     timeout: 1000000,
            //     logger: console,
            //     purse: config.mintPayPrivKey,
            //     owner: config.mintOwnerPrivKey,
            // });
            // await run.inventory.sync();
            // return run

        },
        async sendNFTs(){},
        deleteRecord(order){
            console.log(order.id)
            let response = this.deleteOrder(order)
            console.log(response)
        }
    },
    computed:{
        ordered(){
            let response = [...this.allOrders]
            response.sort(o => o.createdAt.seconds)
            return response;
        }
    }
}
</script>

<style lang="scss" scoped>

</style>