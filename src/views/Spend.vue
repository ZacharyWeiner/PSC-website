<template>
    <div>
        <button @click="spendWeb2" class='text-white'> SPEND </button>
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import axios from "axios";
export default {
    setup () {
        const state = reactive({
            count: 0,
        })
    
        return {
            ...toRefs(state),
        }
    },
    methods:{
        async spend(){
            let owner = await window.relayone.alpha.run.getOwner();
            //1BBuB7Lz3g5ceH11j3bK3U5twrwZPu3HHn
            let run = 
                await new window.Run({ wallet:{
                    ...window.relayone.alpha.run,
                    owner(){return owner}
                },
                network: 'main', 
                trust: "*",
                timeout: 100000 
            })
            console.log(run.owner)
            //this is the deploy location of POO tokens. 
            //The account I am using here does not own the class but has 
            //a $POO balance. 
            const box = await window.tokenkit.ft.getJigBox("d0f84d202d91468f9bbdcf6a028e7223abab5a2c935fb347a65bc3ec6d85ddd8_o2")
            console.log(box.balance)
            //console.log(window);
        },
        async spendWeb2(){
            // let response = await fetch("https://staging-backend.relayx.com/api/run/send", {
            //     "credentials": "omit",
            //     "headers": {
            //         "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:100.0) Gecko/20100101 Firefox/100.0",
            //         "Accept": "application/json",
            //         "Accept-Language": "en-US,en;q=0.5",
            //         "Content-Type": "application/json",
            //         "Sec-Fetch-Dest": "empty",
            //         "Sec-Fetch-Mode": "cors",
            //         "Sec-Fetch-Site": "same-site"
            //     },
            //     "referrer": "https://relayx.com/",
            //     "body": "{\"owner\":\"1BBuB7Lz3g5ceH11j3bK3U5twrwZPu3HHn\",\"to\":\"1CedJmG5WCCKVieFT9tjuHDUvEqvAnCTUJ\",\"amount\":100,\"location\":\"4e60549cbd7527283e5c792d0a456a673f150701e07bd1355c8b8cf814858dd6_o1\"}",
            //     "method": "POST",
            //     "mode": "cors"
            // }).then(v => )
            // console.log("POST RESPONSE:", response.text());
            let response = await axios.post('https://staging-backend.relayx.com/api/run/send', {
                    "amount": "100",
                    "location": "d0f84d202d91468f9bbdcf6a028e7223abab5a2c935fb347a65bc3ec6d85ddd8_o2",
                    "owner": "13gqSLMuaW19vCWWgRXC8iMUdmcneYiUh9",
                    "to": "1CedJmG5WCCKVieFT9tjuHDUvEqvAnCTUJ",
                })
            console.log("Gets a raw transaction:", response.data)
            let sendResponse = window.relayone.send(response.data.data.rawtx)
            console.log("recieves response from send:",  sendResponse)
        },
        async buy(){
             let { data } = await axios.get("https://staging-backend.relayx.com/api/market/6d589398a0b4e83c3100c9b28afa2239be2d21b9080a4c4bcf05767805d637f5_o2/orders");
             let orders = data.data.orders;
             console.log(orders[0])
              orders.sort((a, b) =>{ 
                    let a1 =  parseInt(a.satoshis, 10)
                    let b1 =  parseInt(b.satoshis, 10)
                    return a1 - b1
                });
             console.log(orders[0].satoshis)
             console.log(orders[0].txid, orders[0].location, this.$store.state.user_address, orders[0])
             let response = await axios.post('https://staging-backend.relayx.com/api/dex/buy', {
                    address: this.$store.state.user_address,
                    location: "6d589398a0b4e83c3100c9b28afa2239be2d21b9080a4c4bcf05767805d637f5_o2",
                    txid: orders[0].txid,
                })
                console.log(response)
                let sendResponse = await window.relayone.send(response.data.data.rawtx)
                console.log(sendResponse)
        },
    }
}
</script>

<style lang="scss" scoped>

</style>