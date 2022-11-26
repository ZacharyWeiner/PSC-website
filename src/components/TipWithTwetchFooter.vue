<template>
 <div class="hidden md:block fixed inset-x-0 bottom-0">
    <div class="bg-indigo-600">
      <div class="mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8">
        <div class="flex flex-wrap items-center justify-between">
          <div class="flex w-0 flex-1 items-center">
            <span class="flex rounded-lg bg-indigo-800 p-2">
              <CurrencyDollarIcon class="h-6 w-6 text-white" aria-hidden="true" />
            </span>
            <p class="ml-3 truncate font-medium text-white">
              <span class="">Tip With Twetch Wallet</span>
              <!-- <span class="hidden md:inline">Big news! We're excited to announce a brand new product.</span> -->
            </p>
          </div>
          <div class="flex ">
            <label for="amount" class="sr-only">amount</label>
            <input type="number" name="amount" id="amount" v-model="tipAmount" class="block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 w-24" /> 
            <span class="p-2 text-white">BSV</span>
          </div>
          <div class="order-3 mt-2 w-full flex-shrink-0 sm:order-2 sm:mt-0 sm:w-auto">
            <button @click="tip" class="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-indigo-600 shadow-sm hover:bg-indigo-50">Tip</button>
          </div>
          <div class="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
            <button type="button" class="-mr-1 flex rounded-md p-2 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2">
              <span class="sr-only">Dismiss</span>
              <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import {CurrencyDollarIcon, XMarkIcon} from "@heroicons/vue/outline"
let provider;
export default {
    components: { CurrencyDollarIcon, XMarkIcon},
    setup () {
        const state = reactive({
            count: 0,
            publicKey: "this", 
            paymail: "that",
            tipAmount: 2.18
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
                        sats: this.tipAmount * 100000000
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