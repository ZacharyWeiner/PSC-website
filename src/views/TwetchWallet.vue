<template>
    <div class="text-white">
        {{publicKey}} {{paymail}}
        <button @click="tip" class=" p-2 m-2 text-white bg-gradient-to-r from-blue-300 via-blue-600 to-purple-600 font-bold rounded-xl"> Tip From Twetch Wallet </button> 
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
let provider;
export default {
    setup () {
        const state = reactive({
            count: 0,
            publicKey: "this", 
            paymail: "that",
        })
        return {
            ...toRefs(state),
            provider,
        }
    },
    mounted(){
       
    },
    methods:{
        async tip(){
            const getProvider = () => {
                if ("bitcoin" in window) {
                    const provider = window.bitcoin;
                    if (provider.isTwetch) {
                        return provider;
                    }
                }
                window.open("https://twetch.com/downloads", "_blank");
            };
            this.provider = getProvider();
            if(this.provider){
                window.bitcoin.connect()
                .then(async ({ publicKey, paymail }) => {
                    // Handle successful eager connection
                    console.log(this, publicKey, paymail)
                    this.publicKey = publicKey;
                    this.paymail = paymail;

                    const response = await window.twetch.abi({
                    contract: 'payment',
                    outputs: [{
                        to: '64305@twetch.me',
                        sats: 2180
                    }]
            });
            alert(response)
                })
                .catch(( err ) => {
                    // Handle connection failure as usual
                    console.log(err);
                })
            }

        }
    }
}
</script>

<style lang="scss" scoped>

</style>